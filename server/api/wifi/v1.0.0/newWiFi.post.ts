import Debug from 'debug'
import { PrismaClient,Prisma } from "@prisma/client"
import {validAppKey} from '~/alvato/auth/apiAuth.ts'
import {validateNewWiFi} from '~/alvato/models/wifi.ts'

const debug = Debug('api:config:newWiFi')
const prisma = new PrismaClient()


export default defineEventHandler(async(event)=>{
    // Verify appKey and appSecret
    const isValidKey= await validAppKey(event)


    const body = await readBody(event)
    debug('Body: ',body)

    if(!body){
        throw createError({
            statusCode: 500,
            statusMessage: "Body missing",
        })    
    }

    const {error} = await validateNewWiFi(body)
    if(error){
        throw createError({
            statusCode: 500,
            statusMessage: error.details[0].message,
        })   
    }

    const newWifi = await prisma.wifis.create({
        data:{
            configCode: body.configCode,
            ssid: body.ssid,
            ssidPass: body.ssidPass
        }
    })
    .catch( async (e) => {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
              const err = 'Unique constraint failed on the {constraint}'
              throw createError({
                statusCode:404,
                statusMessage: err
              })
              debug("prisma error: ",err)
            }
        }
    })

    return {data:newWifi}
})