import Debug from 'debug'
import { PrismaClient,Prisma } from "@prisma/client"
import {validatePartnerCode} from '~/alvato/models/partner'


const debug = Debug('api:mqtt:getAll')
const prisma = new PrismaClient()

export default defineEventHandler( async(event) => {
    const body = await readBody(event)
    if(!body){
        throw createError({
            statusCode: 500,
            statusMessage: "Missing body",
        })    
    }
    const {error} = await validatePartnerCode(body)
    if(error){
        throw createError({
            statusCode:400,
            statusMessage: error.details[0].message,
            stack:''
        })   
    }
    
    const partner = await prisma.partners.findUnique({
        where:{
            partnerCode: body.partnerCode
        },
        include:{
            assets:true,
            shops:true,
            devices:true,
            products:true,
            machines:true,
            configs: {
                include:{
                    wifi:true,
                    host:true,
                    mqtt:true
                }
            }
        }
        
    })

    
    const sum = partner?.assets.length + partner?.shops.length + partner?.devices.length + partner?.products.length + partner?.machines
    
    
    if(sum  != "0"){
        throw createError({
            statusCode:500,
            statusMessage: "Cannot delete ",
            stack:''
        })   
    }

    
    const resultData = await prisma.partners.delete({
        where:{
            partnerCode: body.partnerCode
        }
    })


    return {
        statusCode:200,
        statusMessage:'Success',
        data:resultData
        
    }
})