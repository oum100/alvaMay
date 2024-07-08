import Joi from "joi"

export async function validateNewMachine(body:any){
    const schema = Joi.object({
        serialNumber: Joi.string().required(),
        name: Joi.string().required(),
        model: Joi.string().required(),
        type: Joi.string().required(),
        status: Joi.string().required(),
        orderAt: Joi.string().required(),
        expiredAt: Joi.string().required(),
        description: Joi.string()
    }).unknown(true)
    return schema.validate(body)
}