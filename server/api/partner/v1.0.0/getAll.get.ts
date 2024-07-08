import Debug from 'debug'
import { PrismaClient,Prisma } from "@prisma/client"
import {validAppKey} from '~/alvato/auth/apiAuth'

const debug = Debug('api:mqtt:getAll')
const prisma = new PrismaClient()


export default defineEventHandler(async(event)=>{
    // Verify appKey and appSecret
    // const isValidKey= await validAppKey(event)

    const getAll = await prisma.partners.findMany({
        include:{
            products:true,
        }
    })

    return {
        statusCode:200,
        statusMessage:'Success',
        data:getAll
    }
})