import Joi from "joi"

export async function validateNewConfig(body:any){
    const schema = Joi.object({
        configCode: Joi.string().required(),
        name: Joi.string().required(),
        partnerCode: Joi.string().required(),
        description: Joi.string()
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