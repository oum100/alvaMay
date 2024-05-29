import Debug from 'debug'
import { PrismaClient,Prisma } from "@prisma/client"
import {validAppKey} from '~/alvato/auth/apiAuth.ts'
import {validateNewShop} from '~/alvato/models/shop.ts'

const debug = Debug('api:shop:newShop')
const prisma = new PrismaClient()

export default defineEventHandler(async(event)=>{
    // Verify appKey and appSecret
    // const isValidKey= await validAppKey(event)

    const body = await readBody(event)
    debug('Body: ',body)

    if(!body){
        throw createError({
            statusCode: 500,
            statusMessage: "Missing body",
        })    
    }

    const {error} = await validateNewShop(body)
    if(error){
        throw createError({
            statusCode: 500,
            statusMessage: error.details[0].message,
        })   
    }

    const shop = await prisma.shops.create({
        data:{
            partnerCode: body.partnerCode,
            shopCode: body.shopCode,
            shopName: body.shopName,
            uuid: body.uuid || '',
            description: body.description || ''
        }
    })

    return{
        statusCode:200,
        statusMessage:'Success',
        data:shop
    }
})