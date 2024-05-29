import Debug from 'debug'
import {validateNewConfig} from '~/alvato/models/config'
import {defaultcfg} from '~/alvato/models/defaultCFG.ts'
import { PrismaClient,Prisma } from "@prisma/client";

const debug = Debug('api:config:newConfig')
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
    if(!body){
        throw createError({
            statusCode: 500,
            statusMessage: "Missing body",
        })    
    }

    const {error} = await validateNewConfig(body)
    if(error){
        throw createError({
            statusCode:403,
            statusMessage: error.details[0].message
        })
    }

    const config = await prisma.configs.create({
        data:{
            partnerCode: body.partnerCode,
            configCode: body.configCode,
            name: body.name || '',
            description: body.description || '',
        }
    })
    .catch( async (e) => {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
              const err = 'Unique constraint failed on the {constraint}'
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
        statusMessage:'Success',
        data:config
    }
})