import { PrismaClient} from "@prisma/client";
import Debug from 'debug'
import {validateNewMachine} from '~/alvato/models/machine'

const debug = Debug('api:partner:newPartner')
const prisma = new PrismaClient();

export default defineEventHandler(async(event)=>{
    const body = await readBody(event)
    if(!body){
        throw createError({
            statusCode: 500,
            statusMessage: "Missing body",
        })    
    }

    const {error} = await validateNewMachine(body)
    if(error){
        throw createError({
            statusCode:400,
            statusMessage: "Bad requested",
            message: error.details[0].message
        })        
    }

    const machine = await prisma.machines.create({
        data:{
            serailNumber: body.serialNumber,
            name: body.name,
            model: body.model,
            type: body.type,
            description: body.description || null,
            status: body.status
        }
    })

    return {
        statusCode:200,
        statusMessage:'Machine created',
        data:machine
    }


})