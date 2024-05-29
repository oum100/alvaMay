import Debug from 'debug'
import { PrismaClient,Prisma } from "@prisma/client"
import {validAppKey} from '~/alvato/auth/apiAuth.ts'


const debug = Debug('api:device:getAll')
const prisma = new PrismaClient()

export default defineEventHandler(async(event)=>{
     // Verify appKey and appSecret
    // const isValidKey= await validAppKey(event)

    // const query = await getQuery(event)
    // // debug("query: ",query)
    // console.log("query: ",query)

    // if(!query.partnerCode){
    //     throw createError({
    //         statusCode: 500,
    //         statusMessage: "Missing parameter",
    //     })   
    // }

    const device = await prisma.devices.findMany()

    return {
        statusCode:200,
        statusMessage:'Success',
        data:device
    }
})