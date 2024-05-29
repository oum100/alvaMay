import Debug from 'debug'
import {validatePartnerCode} from '~/alvato/models/partner'
import { PrismaClient,Prisma } from "@prisma/client";
// import { nanoid } from 'nanoid'


const prisma = new PrismaClient();

const notFoundError = createError({
    statusCode: 401,
    statusMessage: "Partner not found.",
})

export default defineEventHandler( async(event)=>{
    const body = await readBody(event)

    const {error} = validatePartnerCode(body)
    if(error){
        throw createError({
            statusCode:400,
            statusMessage: "Bad requested",
            message: error.details[0].message
        })
    }    

    const users = await prisma.users.findMany({
        where:{
            partnerCode: body.partnerCode
        },
        select:{
            id:true,
            uuid:true,
            email:true,
            name:true,
            role:true,
            permission:true,
            partnerCode:true,
            shop:true,
            updatedAt:true
        }
    })


    if(!users)throw notFoundError

    return {
        statusCode:200,
        statusMessage:'Success',
        data:users
    }

})