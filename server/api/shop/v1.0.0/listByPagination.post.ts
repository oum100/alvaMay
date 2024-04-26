import Debug from 'debug'
import { PrismaClient,Prisma } from "@prisma/client";
import {validAppKey} from '~/alvato/auth/apiAuth'
import {validateListByPagination} from '~/alvato/models/shop'

import {defaultcfg} from '~/alvato/models/defaultCFG'

// import {defaultcfg as cfg} from '~/alvato/models/host.ts'
const debug = Debug('api:shop:ListByPagination')
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

    const partnerCode = body.partnerCode

    const {error} = await validateListByPagination(body)
    if(error){
        throw createError({
            statusCode:403,
            statusMessage: error.details[0].message
        })
    }

    let listResult
    if(partnerCode != 'ALL'){
        listResult = await prisma.shops.findMany({
            where:{partnerCode: body.partnerCode},
            select:{
                shopCode:true,
                shopName:true,
                description: true,
                partner:{
                    select:{
                        partnerName:true
                    }
                },
                user:{
                    select:{
                        email:true
                    }
                },
                _count:{
                    select:{
                        assets:true
                    }
                }
            }
        })
    }else{
        listResult = await prisma.shops.findMany({
            select:{
                shopCode:true,
                shopName:true,
                description: true,
                partner:{
                    select:{
                        partnerName:true
                    }
                },
                user:{
                    select:{
                        email:true
                    }
                },
                _count:{
                    select:{
                        assets:true
                    }
                }
            }
        })
        // listResult = await prisma.shops.findMany({
        //     include:{
        //         partner: true,
        //         user: true,
        //     },
        // })
        // listResult = await prisma.$transaction([
        //     prisma.shops.findMany({
        //         include:{
        //             partner: true,
        //             user: true,
        //         },         
        //     }),
        //     prisma.assets.count({
               
        //     })
        // ])

    }

  
    return{
        data:listResult
    }
})