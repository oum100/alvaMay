import Debug from 'debug'
import { PrismaClient,Prisma } from "@prisma/client";
import {validAppKey} from '~/alvato/auth/apiAuth'
import {validateListByPagination} from '~/alvato/models/user'

import {defaultcfg} from '~/alvato/models/defaultCFG'

// import {defaultcfg as cfg} from '~/alvato/models/host.ts'
const debug = Debug('api:user:ListByPagination')
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
        listResult = await prisma.users.findMany({
            where:{partnerCode: body.partnerCode},
            select:{
                uuid:true,
                name:true,
                email:true,
                image:true,
                organization:true,
                role:true,
                permission:true,
                isActive:true,
                profile:true,
                _count:{
                    select:{
                        shop:true
                    }
                }
            }
        })
    }else{
        listResult = await prisma.users.findMany({
            select:{
                uuid:true,
                name:true,
                email:true,
                image:true,
                organization:true,
                role:true,
                permission:true,
                isActive:true,
                profile:true,
                _count:{
                    select:{
                        shop:true
                    }
                }
            }

        })
    }

  
    return{
        data:listResult
    }
})