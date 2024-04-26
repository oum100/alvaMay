import Debug from 'debug'
import { PrismaClient,Prisma } from "@prisma/client";
import {validAppKey} from '~/alvato/auth/apiAuth'
import {validateAssignUser} from '~/alvato/models/shop'


const debug = Debug('api:shop:assignAsset')
const prisma = new PrismaClient();

export default defineEventHandler(async(event)=>{


    ////Validate appKey and appSecret
    // const isValidKey= await validAppKey(event)
    // debug("isValidKey: ",isValidKey)

    // if(!isValidKey) {
    //     throw createError({
    //         statusCode:403,
    //         statusMessage: 'unAuthorized'
    //     })
    // }

    //Validate Body
    const body = await readBody(event)
    debug("body: ",body)
    if(!body){
        throw createError({
            statusCode: 500,
            statusMessage: "Missing body",
        })
    }

    const {error} = await validateAssignUser(body)
    if(error){
        throw createError({
            statusCode:403,
            statusMessage: error.details[0].message
        })
    }

    console.log("body.assets: ",body.assets)
    const items = await prisma.shops.update({
        where:{shopCode: body.shopCode},
        data:{
            uuid: body.uuid,
        }
    })
  
    return{
        statusCode:200,
        statusMessage: 'User assigned Successfully',
        data:items
    }
})