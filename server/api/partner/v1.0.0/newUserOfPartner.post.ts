import Debug from 'debug'
import {validateNewPartnerUser} from '~/alvato/models/partner'
import { PrismaClient,Prisma } from "@prisma/client";
import { nanoid } from 'nanoid'

const debug = Debug('api:partner:newUserOfPartner')
const prisma = new PrismaClient();

export default defineEventHandler(async(event)=>{
    const body = await readBody(event)

    const { error } = await validateNewPartnerUser(body)
    if(error){
        throw createError({
            statusCode:400,
            statusMessage: "Bad requested",
            message: error.details[0].message
        })      
    }


})