import Joi from "joi"

export async function validateNewAsset(body:any){
    const schema = Joi.object({
        partnerCode: Joi.string().required(),
        assetName: Joi.string(),
    }).unknown(true)
    return schema.validate(body)
}

export async function validatePartnerCode(body:any){
    const schema = Joi.object({
        partnerCode: Joi.string().required(),
    })
    return schema.validate(body)
}

export async function validateShopCode(body:any){
    const schema = Joi.object({
        shopCode: Joi.string().required(),
    })
    return schema.validate(body)
}

export async function validateAssignShop(body:any){
    const schema = Joi.object({
        assetCode: Joi.string().required(),
        shopCode: Joi.string().required(),
    })
    return schema.validate(body)
}


export async function validateUnAssignShop(body:any){
    const schema = Joi.object({
        assetCode: Joi.string().required(),
        // shopCode: Joi.string().required(),
    })
    return schema.validate(body)
}

export async function validateUpdateAsset(body:any){
    const schema = Joi.object({
        assetCode: Joi.string().required(),
        assetName: Joi.string(),
        assetType: Joi.string().allow(null).allow(''),
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