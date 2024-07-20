import Joi from "joi"

export async function validatePaidNotify(body:any){
    const schema = Joi.object({
        // transaction_id:Joi.string().required(),
        partnerCode: Joi.string(),
        shopCode: Joi.string(),
        assetCode: Joi.string().required(),
        productSku: Joi.string().required(),
        price: Joi.number().required(),      
    }).unknown(true)
    return schema.validate(body)
}