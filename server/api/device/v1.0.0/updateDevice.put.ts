import Debug from 'debug'
import {validateUpdateDevice} from '~/alvato/models/device'
import {validAppKey} from '~/alvato/auth/apiAuth.ts'
import { PrismaClient,Prisma } from "@prisma/client";


const debug = Debug('api:device:updateDevice')
const prisma = new PrismaClient();

export default defineEventHandler(async(event)=>{
    //// Verify appKey and appSecret
    // const isValidKey= await validAppKey(event)
    // if(!isValidKey) {
    //     throw createError({
    //         statusCode:403,
    //         statusMessage: 'unAuthorized'
    //     })
    // }

    const body = await readBody(event)
    debug('Body: ',body)

    if(!body){
        throw createError({
            statusCode: 500,
            statusMessage: "Missing body",
        })    
    }

    const {error} = await validateUpdateDevice(body)
    if(error){
        throw createError({
            statusCode: 500,
            statusMessage: error.details[0].message,
        })   
    }

    const device = await prisma.devices.update({
        where: {deviceMac: body.deviceMac},
        data:{
            deviceName: body.deviceName,
            deviceType: body.deviceType,
            deviceStatus: body.deviceStatus,
            board: body.board,
            firmware: body.firmware
        }
    })
    .catch( async (e) => {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2025') {
              const err = 'Required record not found'
              throw createError({
                statusCode:404,
                statusMessage: err
              })
              debug("prisma error: ",err)
            }
        }
    })

    return {
        statusCode:200,
        statusMessage: "Success",
        data: device
    }
        

})