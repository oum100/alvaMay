import Debug from 'debug'
import {validAppKey} from '~/alvato/auth/apiAuth'
import { PrismaClient,Prisma } from "@prisma/client";
import {defaultcfg} from '~/alvato/models/defaultCFG'

// import {defaultcfg as cfg} from '~/alvato/models/host.ts'
const debug = Debug('api:asset:getAll')
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

    const allList = await prisma.assets.findMany({
        select:{
            assetCode:true,
            assetName:true,
            assetType:false,
            assetStatus:true,
            partnerCode:true,
            shopCode:true,
            configCode:true,
            createdAt:false,
            updatedAt:true,
            partner:{select:{partnerName:true}},
            shop:{select:{shopName:true}},
            device:{select:{deviceName:true}},
            machine:{
                select:{
                    name:true,
                    type:true,
                }
            },
            product:{
                select:{
                    sku:true,
                    price:true,
                }
            }
        }
    })
  
    return{
        statusCode:200,
        statusMessage:'Success',
        data:allList
    }
})