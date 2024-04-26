import Debug from 'debug'
import { PrismaClient,Prisma } from "@prisma/client"
import {validAppKey} from '~/alvato/auth/apiAuth'


// const debug = Debug('api:config:getById')
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

    const shop = await prisma.shops.findMany({
        where:{ partnerCode: query.partnerCode as string},
        include:{
            assets:true,
            partner:true,
            user:true
        }
    })

    return {
        statusCode:200,
        statusMessage:'get all shop sucessfully',
        data:shop
    }
   
})