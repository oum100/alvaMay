import { PrismaClient} from "@prisma/client";
import Debug from 'debug'
import {validateNewPaymentPartner} from '~/alvato/models/payment'

const debug = Debug('api:payment:newPartner')
const prisma = new PrismaClient();

export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    if(!body){
        throw createError({
            statusCode: 500,
            statusMessage: "Missing body",
        })    
    }

    const {error} = await validateNewPaymentPartner(body)
    if(error){
        throw createError({
            statusCode:400,
            statusMessage: "Bad requested",
            message: error.details[0].message
        })        
    }

    

    const resultData = await prisma.paymentPartner.create({
        data:{
            partnerCode: body.partnerCode, //Alvato partnerCode
            shopCode: body.shopCode, //Alvato shopCode
            name: body.paymentName, //Payment partner name
            paymentId: body.paymentID,
            secretKey: body.secretKey,
            paymentUrl: body.paymentUrl,
            sandboxUrl: body.sandboxUrl || '',
            // paymentChannel: body.paymentChannel || ''
        }
    })

    return {
        statusCode:200,
        statusMessage:'Success',
        data:resultData
    }
    
})