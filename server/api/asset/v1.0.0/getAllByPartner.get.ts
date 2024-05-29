import Debug from 'debug'
import {validAppKey} from '~/alvato/auth/apiAuth'
import { PrismaClient,Prisma } from "@prisma/client";
import {defaultcfg} from '~/alvato/models/defaultCFG'

// import {defaultcfg as cfg} from '~/alvato/models/host.ts'
const debug = Debug('api:asset:getAllByPartner')
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
    const query = await getQuery(event)
    if(!query.partnerCode){
        throw createError({
            statusCode: 500,
            statusMessage: "Nissing Parameter",
        })
    }

    const allList = await prisma.assets.findMany({
        where:{partnerCode: query.partnerCode as string},
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
            shop:{
                select:{shopName:true}
            },
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
        statusMessage:'Success',
        data:allList
    }
})