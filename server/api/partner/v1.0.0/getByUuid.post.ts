import Debug from 'debug'
import {validateUuid} from '~/alvato/models/partner'
import { PrismaClient,Prisma } from "@prisma/client";
import { nanoid } from 'nanoid'

const debug = Debug('api:partner:getByUuid')
const prisma = new PrismaClient();

const notFoundError = createError({
    statusCode: 401,
    statusMessage: "Partner not found.",
})

export default defineEventHandler( async(event)=>{

    const body = await readBody(event)
    const {error} = await validateUuid(body)

    if(error){
        throw createError({
            statusCode:400,
            statusMessage: "Bad requested",
            message: error.details[0].message
        })
    }    

    const partner = await prisma.users.findUnique({
        where:{uuid:body.uuid},
        include:{partner: true}
    })

    if(!partner)throw notFoundError
    
    return {
        statusCode:200,
        statusMessage:'success',
        data:partner
    }
})