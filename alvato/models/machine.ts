import Joi from "joi"

export async function validateNewMachine(body:any){
    const schema = Joi.object({
        serialNumber: Joi.string().required(),
        name: Joi.string().required(),
        model: Joi.string().required(),
        type: Joi.string().required(),
        description: Joi.string(),
        status: Joi.string(),
        orderAt: Joi.string(),
        expiredAt: Joi.string()
    }).unknown(true)
    return schema.validate(body)
}