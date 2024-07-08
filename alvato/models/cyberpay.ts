import Joi from "joi"

// export async function validateNewPartner(body:any){
//     const schema = Joi.object({
//         partnerCode:Joi.string().required(),  // Alvato partnerCode
//         shopCode:Joi.string().required(), // Alvato shopCode
//         paymentId:Joi.string().required(), // Payment partner id
//         secretKey:Joi.string().required(), //Payment partner secretKey
//     }).unknown(true)
//     return schema.validate(body)
// }

// export async function validatePaymentRequest(body:any){
//     const schema = Joi.object({
//         // partnerCode:Joi.string().required(),
//         // shopCode:Joi.string().required(),
//         assetCode: Joi.string().required(),
//         // productSku: Joi.string().required(),
//         amount: Joi.number().required(),
//     }).unknown(true)
//     return schema.validate(body)
// }

export async function validatePaidNotify(body:any){
    const schema = Joi.object({
        payment_channel_id: Joi.string().required(),
        transaction_id:Joi.string().required(),
        ref_1: Joi.string().required(),
        ref_2: Joi.string().required(),
        ref_3: Joi.string().required(),
        service_fee: Joi.string().required(),
        bank_code: Joi.string().required()
    }).unknown(true)
    return schema.validate(body)
}

export async function validateNewPaymentChannel(body:any){
    const schema = Joi.object({
        paymentId: Joi.string().required(),
        channelId: Joi.string().required(),
        channelName:Joi.string().required(),
    }).unknown(true)
    return schema.validate(body)
}

//Test pay 1 baht   1st time
// payment_channel_id: 'P002',
// transaction_id: 'CPTZBDR4UU8D4G0DH4D5',
// ref_1: 'CP001SFFZ61FXVS8THWX',
// ref_2: 'CPT25481197156303002',
// ref_3: 'SNL24041717073253627',
// service_fee: 0.01,
// bank_code: '004'

// export async function validateNewCyberpay(body:any){
//     const schema = Joi.object({
//         partnerCode:Joi.number().required(),
//         shopCode:Joi.number().required(),
//         assetCode: Joi.string().required(),
//         productSku: Joi.string().required(),
//         amount: Joi.number().required(),
//     }).unknown(true)
//     return schema.validate(body)
// }