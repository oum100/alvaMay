import jwt  from 'jsonwebtoken'
import { PrismaClient,Prisma } from "@prisma/client"
import {validateGetToken} from '~/alvato/models/oauth'
import bcrypt from 'bcrypt'


const prisma = new PrismaClient();

export default defineEventHandler(async(event)=>{
    const body = await readBody(event)

    const {error} = await validateGetToken(body)
    if(error){
        throw createError({
            statusCode:400,
            statusMessage: "Bad requested",
            message: error.details[0].message
        })            
    }

    //decode find appKey from Partner DB
    const uuid = body.appkey
    const partner = await prisma.partners.findFirst({
        where: {
            appKey: body.appkey
        }
    })
    if(!partner){
        throw createError({
            statusCode: 500,
            statusMessage: 'appkey in valid'
        })
    }

    //compare appSecret with default password
    const auth_appSecret = useRuntimeConfig().AUTH_APPSECRET
    const isValid = await bcrypt.compare(auth_appSecret,body.appsecret)

    if(!isValid){
        throw createError({
            statusCode: 500,
            statusMessage: 'Invalid appSecret'
        }) 
    }

    const token = jwt.sign({
        uuid:partner.uuid,
        partnerCode: partner.partnerCode,
        partnerName: partner.partnerName,
    },auth_appSecret)

    console.log(token)

    return {
        statusCode:200,
        statusMessage:'Success',
        token: token
    }
})