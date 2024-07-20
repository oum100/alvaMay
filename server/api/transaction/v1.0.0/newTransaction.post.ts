import Debug from 'debug'
import {PrismaClient, Prisma} from "@prisma/client"
import { nanoid } from 'nanoid'
import {validAppKey} from '~/alvato/auth/apiAuth'
import {validateNewTransaction} from '~/alvato/models/transaction'


const debug = Debug('api:transaction:newTransaction')
const prisma = new PrismaClient()


export default defineEventHandler(async(event)=>{
    // Verify appKey and appSecret
    const isValidKey= await validAppKey(event)
    if(!isValidKey) {
        throw createError({
            statusCode:403,
            statusMessage: 'unAuthorized'
        })
    }

    const body = await readBody(event)
    debug('Body: ',body)

    if(!body){
        throw createError({
            statusCode: 500,
            statusMessage: "Missing body",
        })    
    }

    const {error} = await validateNewTransaction(body)
    if(error){
        throw createError({
            statusCode: 500,
            statusMessage: error.details[0].message,
        })   
    }

    const nowDT = new Date()
    // paidTrans is autogent nanoid for CASH only
    const paidTrans = nanoid(20)

    const resultData = await prisma.transactions.create({
        data:{
            partnerCode: body.partnerCode,
            shopCode: body.shopCode,
            assetCode: body.assetCode,
            productSku: body.productSku,
            amount: body.amount ,
            paymentBy: body.paymentBy,
            // paymentRequest: body.paymenRequest || "",
            
            qrGenId: body.qrGenId || "",
            wallet: body.wallet || "",
            status: body.status || "PAID",
            jobStart: nowDT ,   
            jobRemain: body.jobRemain,
        }
    })

    // const payBy = body.paymentBy.toUpperCase()
    // switch(payBy){
    //     case 'CASH':
    //         break;
    //     case 'QR':
    //         break;
    //     case "WALLET":
    //         break;
    // }

    return{
        statusCode:200,
        statusMessage:'Success',
        data:resultData
    }
})