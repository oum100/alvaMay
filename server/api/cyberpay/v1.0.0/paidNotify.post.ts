import { PrismaClient } from "@prisma/client";
import Debug from 'debug'
import {validatePaidNotify} from '~/alvato/models/cyberpay'

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

    const {error} = await validatePaidNotify(body)
    if(error){
        throw createError({
            statusCode:400,
            statusMessage: error.details[0].message,
            stack:''
        })   
    }

    //Looking for paymentRequest from Our database.  Reject if not found.
    const paymentReq = await prisma.paymentRequest.findFirstOrThrow({
        where:{
            ref1: body.ref_1
        },
        include:{
            product:true
        }
    })

    //Found paymentRequest continue save paidNotify
    const nowDT = new Date()

    const paidNotify = await prisma.cyberpayPaidNotify.create({
        data:{
            payment_channel_id: body.payment_channel_id,
            transaction_id: body.transaction_id,  // transaction from payment
            ref_1: body.ref_1,
            ref_2: body.ref_2,
            ref_3: body.ref_3,
            service_fee: body.service_fee,
            bank_code: body.bank_code,
            paymentRequestId: paymentReq.id,
            
            transaction:{
                create:{
                    partnerCode: paymentReq.partnerCode,
                    shopCode: paymentReq.shopCode,
                    assetCode: paymentReq.assetCode,
                    productSku: paymentReq.productSku,
                    amount: paymentReq.amount ,
                    paymentBy: paymentReq.paymentBy,
                    // paymentRequestId: paymentReq.id,

                    qrGenId: body.qrGenId || "",
                    wallet: body.wallet || "",
                    status: body.status || "PAID",
                    jobStart: nowDT ,   
                    jobRemain: paymentReq.product.qty
                }
            }
        },
    })
    if(!paidNotify){
        throw createError({
            statusCode:500,
        })
    }


    //paidNotify create new transaction 
    // const newTransaction = await prisma.transactions.create({
    //     data:{
    //         partnerCode: paymentReq.partnerCode,
    //         shopCode: paymentReq.shopCode,
    //         assetCode: paymentReq.assetCode,
    //         productSku: paymentReq.productSku,
    //         amount: paymentReq.amount ,
    //         paymentBy: paymentReq.paymentName,
    //         paymentRequestId: paymentReq.id,
    //         // paidNotify: paidNotify.transaction_id,
    //         qrGenId: body.qrGenId || "",
    //         wallet: body.wallet || "",
    //         status: body.status || "PAID",
    //         jobStart: nowDT ,   
    //         jobRemain: paymentReq.product.qty
    //     }
    // })



    //Update Asset to perform job. *** call api asset Job create


    
    //Return paid success to payment partner.
    const resultData = {
        status:true,
        message:'success',
        data:{
            transaction_id:body.transaction_id
        }
    }

    return resultData

  

})