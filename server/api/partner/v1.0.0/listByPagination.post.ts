import Debug from 'debug'
import { PrismaClient,Prisma } from "@prisma/client";
import {validAppKey} from '~/alvato/auth/apiAuth'
import {validateListByPagination} from '~/alvato/models/partner'

import {defaultcfg} from '~/alvato/models/defaultCFG'

// import {defaultcfg as cfg} from '~/alvato/models/host.ts'
const debug = Debug('api:partner:ListByPagination')
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


    const {error} = await validateListByPagination(body)
    if(error){
        throw createError({
            statusCode:403,
            statusMessage: error.details[0].message
        })
    }

    let listResult
    
    listResult = await prisma.partners.findMany({
        select:{
            partnerCode: true,
            partnerName: true,
            // shops:{
            //     select:{
            //         shopCode:true
            //     }
            // },
            _count:{
                select:{
                    shops:true,
                    users:true,
                    assets:true,
                    configs:true,
                    products:true,
                    machines:true
                }
            }
        }
    })

    return{
        data:listResult
    }
})