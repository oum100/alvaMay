import Debug from 'debug'
import { PrismaClient,Prisma } from "@prisma/client"

const debug = Debug('api:config:getAllByConfig')
const prisma = new PrismaClient()

export default defineEventHandler(async(event)=>{
    const query = await getQuery(event)
    // // debug("query: ",query)
    console.log("query: ",query.configCode)

    if(!query.configCode){
        throw createError({
            statusCode: 500,
            statusMessage: "Missing parameter",
        })   
    }

    const config = await prisma.configs.findFirst({
        where:{ configCode: query.configCode},
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