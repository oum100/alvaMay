import Debug from 'debug'
import { PrismaClient,Prisma } from "@prisma/client"

const debug = Debug('api:mqtt:getAllByConfig')
const prisma = new PrismaClient()

export default defineEventHandler(async(event)=>{
    const query = await getQuery(event)
    // // debug("query: ",query)
    // console.log("query: ",query)
    if(!query.configCode){
        throw createError({
            statusCode: 500,
            statusMessage: "Missing query parameter",
        })   
    }

    const getAll = await prisma.mqtts.findMany({
        where:{ configCode: query.configCode},
    })

    return {
        statusCode:200,
        statusMessage:'Success',
        data:getAll
    }
})