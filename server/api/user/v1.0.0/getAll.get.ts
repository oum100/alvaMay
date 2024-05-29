import Debug from 'debug'
import { PrismaClient,Prisma } from "@prisma/client"

const debug = Debug('api:shop:getAll')
const prisma = new PrismaClient()

export default defineEventHandler(async(event)=>{
    const getAll = await prisma.users.findMany()
    return {
        statusCode:200,
        statusMessage:'Success',
        data:getAll
    }
})