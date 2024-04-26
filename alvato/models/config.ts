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