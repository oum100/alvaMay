import Joi from "joi"

export async function validateUserRegister(body:any){
    const schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }),
        name: Joi.string().required(),
        password: Joi.string().required(),
        partnerCode: Joi.string(),
        role: Joi.string(),
        permission: Joi.string(),
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