import Joi from "joi"

export async function validateNewProduct(body:any){
    const schema = Joi.object({
        partnerCode: Joi.string().required(),
        // assetCode: Joi.string().required(),
        sku: Joi.string().required(),
        type: Joi.string().required(),
        price: Joi.number().min(0).max(9999).required().default(0),
        qty: Joi.number().min(0).max(999).required().default(0 ),
        unit: Joi.string().required(),
        shortName: Joi.string(),
        description: Joi.string(),
        
    }).unknown(true)
    return schema.validate(body)
}

export async function validateListByPagination(body:any){
    const schema = Joi.object({
        partnerCode: Joi.string(),
        startDate:Joi.string().allow(''),
        endDate:Joi.string().allow(''),
        page:Joi.number().required(),
        rowsPerPage:Joi.number().required(),
        rowsNumber:Joi.number().required(),
        filter:Joi.string()
    }).unknown(true)
    return schema.validate(body)
}