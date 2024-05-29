import Debug from 'debug'
import { PrismaClient,Prisma } from "@prisma/client"
import {validAppKey} from '~/alvato/auth/apiAuth'
import {validateUpdateAsset} from '~/alvato/models/asset'

const debug = Debug('api:asset:updateAsset')
const prisma = new PrismaClient()

export default defineEventHandler(async(event)=>{
    // Verify appKey and appSecret
    // const isValidKey= await validAppKey(event)
    // if(!isValidKey) {
    //     throw createError({
    //         statusCode:403,
    //         statusMessage: 'unAuthorized'
    //     })
    // }
    const body = await readBody(event)
    debug('Body: ',body)

    if(!body){
        throw createError({
            statusCode: 500,
            statusMessage: "Missing body",
        })    
    }

    const {error} = await validateUpdateAsset(body)
    if(error){
        throw createError({
            statusCode: 500,
            statusMessage: error.details[0].message,
        })   
    }

    const asset = await prisma.assets.update({
        where:{ assetCode: body.assetCode},
        data:{
            assetName: body.assetName,
            assetType: body.assetType,
            assetStatus: body.assetStatus
        }
    })

    return{
        statusCode:200,
        statusMessage:'Success',
        data:asset
    }
})