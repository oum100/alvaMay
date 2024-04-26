import Debug from 'debug'
import { PrismaClient,Prisma } from "@prisma/client"

const debug = Debug('api:config:getAll')
const prisma = new PrismaClient()

export default defineEventHandler(async(event)=>{
    const config = await prisma.configs.findMany({
        include:{
            wifi:true,
            host:true,
            mqtt:true
        }
    })
    return {
        statusCode:200,
        statusMessage: "Get all config successfully!",
        data:config
    }
})