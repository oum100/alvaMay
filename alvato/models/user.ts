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

