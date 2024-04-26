import Joi from "joi"

export async function validateNewHost(body:any){
    const schema = Joi.object({
        configCode: Joi.string().required(),
        apiHost: Joi.string().required(),
        apiPort: Joi.string().required(),
        apiPath: Joi.string().required(),
        hostName: Joi.string(),
        hostPort: Joi.string(),
        hostPath: Joi.string(),
    }).unknown(true)
    return schema.validate(body)
}