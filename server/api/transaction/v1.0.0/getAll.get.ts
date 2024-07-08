import Debug from 'debug'
import { PrismaClient,Prisma } from "@prisma/client"

const debug = Debug('api:shop:getAll')
const prisma = new PrismaClient()

export default defineEventHandler(async(event)=>{
    const getAll = await prisma.transactions.findMany({
        include:{
            cyberpayPaidNotify:{
                include:{
                    paymentRequest:true
                }
            },
            scbPaidNotify:{
                include:{
                    paymentRequest:true
                }
            }
        }
    })



    return {
        statusCode:200,
        statusMessage:'Success',
        data:getAll
    }
})