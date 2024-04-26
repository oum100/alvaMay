import Debug from 'debug'
import { PrismaClient,Prisma } from "@prisma/client";
import {validAppKey} from '~/alvato/auth/apiAuth'
import {validatePartnerCode} from '~/alvato/models/asset'

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
    const body = await readBody(event)
    if(!body){
        throw createError({
            statusCode: 500,
            statusMessage: "Missing body",
        })
    }

    const {error} = await validatePartnerCode(body)
    if(error){
        throw createError({
            statusCode:403,
            statusMessage: error.details[0].message
        })
    }

    const allList = await prisma.shops.findMany({
        where:{partnerCode: body.partnerCode},
    })
  
    return{
        data:allList
    }
})