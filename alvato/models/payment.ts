import Joi from "joi"
import { validatePartnerCode } from "./asset"

export async function validateNewPaymentPartner(body:any){
    const schema = Joi.object({
        partnerCode:Joi.string().required(), //Alvato partnerCode
        shopCode: Joi.string().required(), //Alvato shopCode
        paymentName: Joi.string().required(), // payment name  such as CyberPay, PaySolution, MaeManee, SlipOK
        paymentID: Joi.string().required(), // payment partnerId
        secretKey: Joi.string().required(), // payment secret
        paymentUrl: Joi.string().required(),
        sandboxUrl: Joi.string(),
        paymentChannel: Joi.string(),
    }).unknown(true)
    return schema.validate(body)
}

export async function validatePaymentRequest(body:any){
    const schema = Joi.object({
        paymentChannel:Joi.string().required(),
        channelId: Joi.string(),
        assetCode: Joi.string().required(),
        productSku: Joi.string().required(),
        amount: Joi.number().required(),
    }).unknown(true)
    return schema.validate(body)
}

export async function validateNewPaymentUrl(body:any){
    const schema = Joi.object({
        paymentChannel: Joi.string().required(),
        paymentUrl: Joi.string().required(),
        sandboxUrl: Joi.string(),
    }).unknown(true)
    return schema.validate(body)
}

export async function validateGetPaymentUrl(body:any){
    const schema = Joi.object({
        paymentChannel: Joi.string().required(),
    }).unknown(true)
    return schema.validate(body)
}