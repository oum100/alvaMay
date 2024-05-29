import Debug from 'debug'
import { PrismaClient,Prisma } from "@prisma/client"

const debug = Debug('api:shop:getAll')
const prisma = new PrismaClient()

export default defineEventHandler(async(event)=>{
    const shop = await prisma.shops.findMany()
    return {
        statusCode:200,
        statusMessage:'Success',
        data:shop
    }
})