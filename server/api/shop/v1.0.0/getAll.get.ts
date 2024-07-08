import Debug from 'debug'
import { PrismaClient,Prisma } from "@prisma/client"

const debug = Debug('api:shop:getAll')
const prisma = new PrismaClient()

export default defineEventHandler(async(event)=>{
    const resultData = await prisma.shops.findMany({
        include:{
            // assets:true,
            // devices:true,
            paymentPartner:true
        }
    })
    return {
        statusCode:200,
        statusMessage:'Success',
        data:resultData
    }
})