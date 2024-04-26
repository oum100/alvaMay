import Joi from "joi"

export async function validateNewShop(body:any){
    const schema = Joi.object({
        partnerCode: Joi.string().required(),
        shopCode: Joi.string().required(),
        shopName: Joi.string().required(),
        uuid: Joi.string(),
        description: Joi.string(),
    }).unknown(true)
    return schema.validate(body)
}

export async function validateAssignUser(body:any){
    const schema = Joi.object({
        shopCode: Joi.string().required(),
        uuid: Joi.string().required()
    }).unknown(true)
    return schema.validate(body)
}

export async function validateUpdateShop(body:any){
    const schema = Joi.object({
        shopCode: Joi.string().required(),
        shopName: Joi.string(),
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
    })
    return schema.validate(body)
}

