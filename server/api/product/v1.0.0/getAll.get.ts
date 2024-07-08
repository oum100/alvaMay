import Debug from 'debug'
import { PrismaClient,Prisma } from "@prisma/client"

const debug = Debug('api:shop:getAll')
const prisma = new PrismaClient()

export default defineEventHandler(async(event)=>{
    const products = await prisma.products.findMany({
        include:{
            asset:{
                select:{
                    id:true,
                    assetCode:true,
                    assetName:true,
                }
            }
        }
    })
    return {
        statusCode:200,
        statusMessage:'Success',
        data:products
    }
})