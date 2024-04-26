import Joi from "joi"

export async function validateUuid(body:any){
    const schema = Joi.object({
        uuid: Joi.string().required(),
    })
    return schema.validate(body)
}

export async function validatePartnerCode(body:any){
    const schema = Joi.object({
        partnerCode: Joi.string().required(),
    })
    return schema.validate(body)
}

export async function validateNewPartner(body:any){
    const schema = Joi.object({
        uuid: Joi.string().required(),
        name: Joi.string().required(),
        logo: Joi.string()
    })
    return schema.validate(body)
}

export async function validateNewPartnerUser(body:any){
    const schema = Joi.object({
        uuid: Joi.string().required(),
        name: Joi.string().required(),
        logo: Joi.string()
    })
    return schema.validate(body)
}

