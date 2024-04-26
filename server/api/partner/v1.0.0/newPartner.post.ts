import Debug from 'debug'
import {validateNewPartner} from '~/alvato/models/partner'
import jwt  from 'jsonwebtoken'
import { PrismaClient,Prisma } from "@prisma/client"
import { nanoid,customAlphabet} from 'nanoid'
import { RuntimeConfig } from 'nuxt/schema'
import { Base64 } from 'js-base64'
import bcrypt from 'bcrypt'
import {defaultcfg} from '~/alvato/models/defaultCFG'

const debug = Debug('api:partner:newPartner')
const prisma = new PrismaClient();
const shortNanoid = customAlphabet('1234567890')



export default defineEventHandler( async(event) =>{
    const body = await readBody(event)

  
    const {error} = await validateNewPartner(body)
    if(error){
        throw createError({
            statusCode:400,
            statusMessage: "Bad requested",
            message: error.details[0].message
        })        
    }

    const partnerCode = shortNanoid(5)
    const authAppSecret = useRuntimeConfig().AUTH_APPSECRET

    // console.log("authappSecret: ",authAppSecret)

    const appKey = body.uuid
    const appSecret = await bcrypt.hash(authAppSecret+appKey,12)
    
    // console.log("AppSecret: ",appSecret)

    //To check appSecret
    // const result = await bcrypt.compare(authAppSecret+appKey,appSecret)

    // console.log("defaultcfg: ", defaultcfg)

    const partner = await prisma.partners.create({
        data:{
            partnerCode: partnerCode,
            partnerName:body.name,
            appKey:appKey,
            appSecret:appSecret,
            configs:{
                create:{
                    // partnerCode: partnerCode,
                    configCode: defaultcfg.config.configCode,
                    name: defaultcfg.config.name,
                    description: defaultcfg.config.description,
                    wifi:{createMany:{data:defaultcfg.wifi}},
                    host:{createMany:{data:defaultcfg.host}},
                    mqtt:{ createMany:{data:defaultcfg.mqtt}}
                }
            }
        },
    })
    // .catch( async (e) => {
    //     if (e instanceof Prisma.PrismaClientKnownRequestError) {
    //         if (e.code === 'P2025') {
    //           const err = 'Operation failed, record not found'
    //           throw createError({
    //             statusCode:404,
    //             statusMessage: err
    //           })
    //           console.log(err)
    //         }
    //     }
    // })    

    // update user whose create this partner
    const user = await prisma.users.update({
        where:{
            uuid: body.uuid
        },
        data:{
            partnerCode: partnerCode
        },
        include:{
            partner:true,
            profile:true
        }
    })

    return {data:user}
})