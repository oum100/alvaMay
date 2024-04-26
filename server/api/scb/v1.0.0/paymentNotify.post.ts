import Debug from 'debug'
import {validatePaymentNotify} from '~/alvato/models/scb'
import { PrismaClient,Prisma } from "@prisma/client";
import { RuntimeConfig } from 'nuxt/schema';

const prisma = new PrismaClient();

export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    console.log('body: ',body)

    const {error} = await validatePaymentNotify(body)
    if(error){
        throw createError({
            statusCode:400,
            statusMessage: "Bad requested",
            message: error.details[0].message
        })        
    }    

    const paymentNotify = await prisma.sCBPaymentNotify.create({
        data:{
            amount: body.amount,
            transactionId: body.transactionId,
            transactionDateandTime: body.transactionDateandTime,
            currencyCode:body.currencyCode,
            //below is option base on type of payment  BP, CCFA, CCIPP, QRCS, Alipay, WeChatPay
            transactionType: body.transactionType,
            channelCode: body.channelCode ||null,
            billPaymentRef1: body.billPaymentRef1,
            billPaymentRef2: body.billPaymentRef2,
            billPaymentRef3: body.billPaymentRef3,
            payeeProxyId: body.payeeProxyId,
            payeeProxyType: body.payeeProxyType,
            payeeAccountNumber: body.payeeAccountNumber,
            payerAccountNumber: body.payerAccountNumber,
            payerName: body.payerName,
            sendingBankCode: body.sendingBankCode,
            recevingBangCode: body.receivingBankCode,
            consumerPAN: body.consumerPAN,
            merchantPAN: body.merchantPAN,
            traceNo: body.traceNo,
            terminalId: body.terminalId,
            merchantId: body.merchantId,
            authorizeCode: body.authorizeCode,
            paymentMethod: body.paymentMethod || null,
            tenor: body.tenor || null,
            ippType: body.ippType,
            productCode: body.productCode,
            qrId: body.qrId,
            invoice: body.invoice,
            note: body.note,
            exchangeRate: body.exchangeRate,
            equivalentAmount: body.equivalentAmount,
            equivalentCurrencyCode: body.equivalentCurrencyCode,
            companyId: body.companyId
        }
    })

    return {
        rescode:'00',
        resDesc: 'success',
        transctionId: body.transactionId,
        confirmId: paymentNotify.id
    }

})