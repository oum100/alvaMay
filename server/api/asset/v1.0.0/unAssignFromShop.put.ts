import Debug from 'debug'
import { PrismaClient,Prisma } from "@prisma/client"
import {validAppKey} from '~/alvato/auth/apiAuth.ts'
import {validateUnAssignShop} from '~/alvato/models/asset.ts'

const debug = Debug('api:asset:unassignShop')
const prisma = new PrismaClient()

export default defineEventHandler(async(event)=>{
    //// Verify appKey and appSecret
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

    const {error} = await validateUnAssignShop(body)
    if(error){
        throw createError({
            statusCode: 500,
            statusMessage: error.details[0].message,
        })   
    }

    const asset = await prisma.assets.update({
        where:{ assetCode: body.assetCode},
        data:{
            shopCode: '',
            assetStatus: "AVAILABLE"
        }
    })

    return{
        statusCode:200,
        statusMessage: "Unassign asset successfully!",
        data:asset
    }
})