import Joi from "joi"

export async function validateNewTransaction(body:any){
    const schema = Joi.object({
        partnerCode: Joi.string().required(),
        shopCode: Joi.string().required(),
        assetCode: Joi.string().required(),
        productSku: Joi.string().required(),
        amount: Joi.number().required(),
        paymentBy: Joi.string().required().valid("CASH","QR","WALLET"),
        status: Joi.string(),
        qrGenID: Joi.string(),
        paidNotify: Joi.string(),
        wallet: Joi.string(),
        jobStart: Joi.date(),
    }).unknown(true)
    return schema.validate(body)
}

export async function validateJobUpdate(body:any){
    const schema = Joi.object({
        jobRemain: Joi.number(),
    }).unknown(true)
    return schema.validate(body)
}