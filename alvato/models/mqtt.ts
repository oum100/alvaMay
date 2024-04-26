import Joi from "joi"

export async function validateNewMqtt(body:any){
    const schema = Joi.object({
        configCode: Joi.string().required(),
        mqttHost: Joi.string().required(),
        mqttPort: Joi.string().required(),
        mqttUser: Joi.string().required(),
        mqttPass: Joi.string().required(),
        pubTopic: Joi.string().reqiured(),
        subTopic: Joi.string().required()
    })
    return schema.validate(body)
}