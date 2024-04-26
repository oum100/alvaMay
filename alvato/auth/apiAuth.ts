
import bcrypt from 'bcrypt'
import { H3Event } from 'h3';

export async function validAppKey(event: H3Event): Promise<H3Error | null>{
    // console.log(event.node.req.headers)
    const headerError = await validateAppKeyAppSecret(event)
    
    if(headerError){
        throw createError({ statusCode: 400, statusMessage: headerError })
    }

    const appKey = event.node.req.headers.appkey
    const appSecret = event.node.req.headers.appsecret

    const auth_appsecret = useRuntimeConfig().AUTH_APPSECRET
    // console.log("auth_apppsecret: ",auth_appsecret)

    const result = await bcrypt.compare(auth_appsecret+appKey,appSecret)
    // console.log("result: ",result)

    return result
}

export async function validateAppKeyAppSecret(event: H3Event){
    if(!event.node.req.headers.appkey){
        return "No appKey provided."
    }

    if(!event.node.req.headers.appsecret){
        return "No appSecret provided."
    }
}