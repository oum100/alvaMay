import Joi from "joi"

export async function validateGetToken(body:any){
    const schema = Joi.object({
        appkey: Joi.string().required(),
        appsecret: Joi.string().required()
    })
    return schema.validate(body)
}