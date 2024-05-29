import Joi from "joi"

export async function validateRegisterDevice(body:any){
    const schema = Joi.object({
        partnerCode: Joi.string().required(),
        deviceMac: Joi.string().required(),
        shopCode: Joi.string(),
        configCode: Joi.string(),
        deviceName: Joi.string(),
        deviceType: Joi.string(),
        deviceStatus: Joi.string().valid("ONLINE", "OFFLINE","REGISTERED","REPLACED"),
        board: Joi.string(),
        firmware: Joi.string()
    }).unknown(true)
    return schema.validate(body)
}

export async function validateUpdateDevice(body:any){
    const schema = Joi.object({
        deviceMac: Joi.string().required(),
        deviceName: Joi.string(),
        deviceType: Joi.string(),
        deviceStatus: Joi.string(),
        board: Joi.string(),
        firmware: Joi.string()
    }).unknown(true)
    return schema.validate(body)
}

export async function validateListByPagination(body:any){
    const schema = Joi.object({
        partnerCode: Joi.string().required(),
        shopCode: Joi.string().required(),
        startDate:Joi.string().allow(''),
        endDate:Joi.string().allow(''),
        page:Joi.number().required(),
        rowsPerPage:Joi.number().required(),
        rowsNumber:Joi.number().required(),
        filter:Joi.string(),
        sortBy:Joi.string(),
        descending:Joi.boolean()
    }).unknown(true)
    return schema.validate(body)
}