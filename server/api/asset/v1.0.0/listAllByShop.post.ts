import Debug from 'debug'
import { PrismaClient,Prisma } from "@prisma/client";
import {validAppKey} from '~/alvato/auth/apiAuth.ts'
import {validateShopCode} from '~/alvato/models/asset.ts'

import {defaultcfg} from '~/alvato/models/defaultCFG.ts'

// import {defaultcfg as cfg} from '~/alvato/models/host.ts'
const debug = Debug('api:asset:listAllByShop')
const prisma = new PrismaClient();


// console.log("cfg: ",cfg)

export default defineEventHandler(async(event)=>{
    debug("defaultcfg: ",defaultcfg)

    // const isValidKey= await validAppKey(event)
    // debug("isValidKey: ",isValidKey)

    // if(!isValidKey) {
    //     throw createError({
    //         statusCode:403,
    //         statusMessage: 'unAuthorized'
    //     })
    // }
    const body = await readBody(event)
    if(!body){
        throw createError({
            statusCode: 500,
            statusMessage: "Missing body",
        })
    }

    const {error} = await validateShopCode(body)
    if(error){
        throw createError({
            statusCode:403,
            statusMessage: error.details[0].message
        })
    }
    
    const allList = await prisma.assets.findMany({
        where:{shopCode: body.shopCode},
        select:{
            assetCode:true,
            assetName:true,
            assetType:false,
            assetStatus:true,
            partnerCode:false,
            shopCode:true,
            configCode:true,
            createdAt:false,
            updatedAt:true,
            device:{
                select:{
                    deviceName:true,
                }
            },
            machine:{
                select:{
                    name:true,
                    type:true,
                }
            },
            product:{
                select:{
                    sku:true,
                }
            }
        }
    })
  
    return{
        statusCode:200,
        statusMessage: "List asset successfully!",
        data:allList
    }
})