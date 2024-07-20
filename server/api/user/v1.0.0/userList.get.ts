import Debug from 'debug'
import { PrismaClient,Prisma } from "@prisma/client"

const debug = Debug('api:shop:getAll')
const prisma = new PrismaClient()

export default defineEventHandler(async(event)=>{
    const getAll = await prisma.users.findMany({
        where:{
            role:'OWNER'
        },
        select:{
            uuid:true,
            name:true,
            partnerCode:true,
            organization:true
        }
    })
    return {
        statusCode:200,
        statusMessage:'Success',
        data:getAll
    }
})