import Joi from "joi"

export async function validateNewWiFi(body:any){
    const schema = Joi.object({
        configCode: Joi.string().required(),
        ssid: Joi.string().required(),
        ssidPass: Joi.string().required(),
    })
    return schema.validate(body)
}