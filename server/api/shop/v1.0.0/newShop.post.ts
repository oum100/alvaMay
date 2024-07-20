import Debug from 'debug'
import { PrismaClient,Prisma } from "@prisma/client"
import {validAppKey} from '~/alvato/auth/apiAuth'
import {validateNewShop} from '~/alvato/models/shop'

const debug = Debug('api:shop:newShop')
const prisma = new PrismaClient()

export default defineEventHandler(async(event)=>{
    // Verify appKey and appSecret
    // const isValidKey= await validAppKey(event)
    // if(!isValidKey) {
    //     throw createError({
    //         statusCode:403,
    //         statusMessage: 'unAuthorized'
    //     })
    // }

    const body = await readBody(event)
    const zeroPad = (num:number, places:number) => String(num).padStart(places, '0')
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