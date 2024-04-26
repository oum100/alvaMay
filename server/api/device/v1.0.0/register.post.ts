import Debug from 'debug'
import {validateRegisterDevice} from '~/alvato/models/device'
import {validAppKey} from '~/alvato/auth/apiAuth.ts'
import { PrismaClient,Prisma } from "@prisma/client";
import { nanoid, customAlphabet} from 'nanoid'

const debug = Debug('api:device:register')
const prisma = new PrismaClient();
const nanoid = customAlphabet('1234567890ABCDEFGHIGKLMNOPQRSTUVWXYZ')

export default defineEventHandler(async(event)=>{
    //// Verify appKey and appSecret
    const isValidKey= await validAppKey(event)
    if(!isValidKey) {
        throw createError({
            statusCode:403,
            statusMessage: 'unAuthorized'
        })
    }

    //Get body
    const body = await readBody(event)
    if(!body){
        throw createError({
            statusCode: 500,
            statusMessage: "Missing body",
        })    
    }

    //Validate body detail
    const {error} = await validateRegisterDevice(body)
    if(error){
        throw createError({
            statusCode: 500,
            statusMessage: error.details[0].message,
        })   
    }

    if(!body.config){

    }
    //verify duplicate deviceMac. 
      //if yes return existing device and asset information.
      //if no  create new one.

    const foundDevice = await prisma.devices.findUnique({
        where: {
            deviceMac: body.deviceMac
        }
    })  

    if(foundDevice){
        //Device registered return existing asset and devic info
        // console.log("foundDevice: ", foundDevice)
        const asset = await prisma.assets.findUnique({
            where: {
                assetCode: foundDevice.assetCode
            },
            include:{
                device:true,
                product:true,
                machine:true,
                config:{
                    include:{
                        wifi:true,
                        host:true,
                        mqtt:true
                    }
                }
            }
        })
        return {
            statusCode:200,
            statusMessage:"This asset already exists",
            data:asset
        }
    }else{
        //Create Asset and Device together and return
        // Asset 
        //  - Device
        //    - Config
        //    - Product
        //    - Machine
        const newAssetCode = nanoid(10)
        const newDeviceName = body.deviceMac.replaceAll(":","").split("").reverse().join("")

        const asset = await prisma.assets.create({
            data: {
                partnerCode: body.partnerCode,
                shopCode: body.shopCode || '',
                assetCode: newAssetCode,
                assetName: body.assetName || newAssetCode,
                assetStatus: 'AVAILABLE',  // AVAILABLE, ASSIGN, 
                configCode: body.configCode || 'CFG000',
                device:{
                    create:{
                        deviceMac: body.deviceMac,
                        deviceName: body.deviceName || newDeviceName,
                        deviceStatus: body.devicStatus || "REGISTERED",
                        deviceType:body.type || '',
                        board: body.board || '',
                        firmware: body.firmware || '',
                    }
                }
            },
            include:{
                device:true,
                product:true,
                machine:true,
                config:{
                    include:{
                        wifi:true,
                        host:true,
                        mqtt:true
                    }
                }
            }
        })
        return {
            statusCode:200,
            statusMessage:"Completed registration",
            data:asset
        }
    }



    
})