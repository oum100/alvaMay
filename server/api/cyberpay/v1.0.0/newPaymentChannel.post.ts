import { PrismaClient } from "@prisma/client";
import Debug from 'debug'
import {validateNewPaymentChannel} from '~/alvato/models/cyberpay'

const debug = Debug('api:cyberpay:paidNotify')
const prisma = new PrismaClient();

export default defineEventHandler(async(event) =>{
    const body = await readBody(event)
    if(!body){
        throw createError({
            statusCode: 500,
            statusMessage: "Missing body",
        })    
    }
    // console.log("Body: ",body)

    const {error} = await validateNewPaymentChannel(body)
    if(error){
        throw createError({
            statusCode:400,
            statusMessage: error.details[0].message,
            stack:''
        })   
    }

    const resultData = await prisma.cyberPaymentChannel.create({
        data:{
            paymentId: body.paymentId,
            channelId: body.channelId,
            channelName: body.channelName
        }
    })

    return{
        status:true,
        message:'success',
        data:resultData
    }

    
})