import Debug from 'debug'
import { PrismaClient,Prisma } from "@prisma/client"

const debug = Debug('api:shop:getAll')
const prisma = new PrismaClient()

export default defineEventHandler(async(event)=>{
    const resultData = await prisma.paymentRequest.findMany({
        // where:{
        //     assetCode: "AUVWWH0GKR"
        // }
        include:{
            cyberpayPaidNotify:true,
            product:true
        }
    })
    return {
        statusCode:200,
        statusMessage:'Success',
        data:resultData
    }
})