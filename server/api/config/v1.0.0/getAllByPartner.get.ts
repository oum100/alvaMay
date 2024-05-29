import Debug from 'debug'
import { PrismaClient,Prisma } from "@prisma/client"
import {validAppKey} from '~/alvato/auth/apiAuth.ts'


const debug = Debug('api:config:getAllByPartner')
const prisma = new PrismaClient()

export default defineEventHandler(async(event)=>{
     // Verify appKey and appSecret
    // const isValidKey= await validAppKey(event)

    const query = await getQuery(event)
    // // debug("query: ",query)
    // console.log("query: ",query)

    if(!query.partnerCode){
        throw createError({
            statusCode: 500,
            statusMessage: "Missing parameter",
        })   
    }

    const config = await prisma.configs.findFirst({
        where:{ partnerCode: query.partnerCode},
        include:{
            wifi:true,
            host:true,
            mqtt:true
        }
    })

    return {
        statusCode:200,
        statusMessage:'Success',
        data:config
    }
})