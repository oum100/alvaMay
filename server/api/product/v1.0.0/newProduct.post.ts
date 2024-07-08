import { PrismaClient} from "@prisma/client";
import Debug from 'debug'
// import { customAlphabet } from 'nanoid'
import {validateNewProduct} from '~/alvato/models/product'

const debug = Debug('api:partner:newPartner')
const prisma = new PrismaClient();
// const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',10);

export default defineEventHandler(async(event)=>{
    const body = await readBody(event)
    if(!body){
        throw createError({
            statusCode: 500,
            statusMessage: "Missing body",
        })    
    }

    const {error} = await validateNewProduct(body)
    if(error){
        throw createError({
            statusCode:400,
            statusMessage: "Bad requested",
            message: error.details[0].message
        })        
    }

    const resultData = await prisma.products.create({
        data:{
            partnerCode: body.partnerCode,
            // assetCode: body.assetCode,
            sku: body.sku,
            price: body.price,
            qty: body.qty,
            unit: body.unit,
            shortName: body.shortName || null,
            type: body.type,
            description: body.description || null,
        }
    })

    return {
        statusCode:200,
        statusMessage:'Machine created',
        data:resultData
    }


})