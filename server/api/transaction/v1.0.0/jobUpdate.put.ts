import Debug from 'debug'
import { PrismaClient,Prisma } from "@prisma/client"
import {validateJobUpdate} from '~/alvato/models/transaction'

const debug = Debug('api:transaction.update')
const prisma = new PrismaClient()

export default defineEventHandler(async(event)=>{
    const body = await readBody(event)
    
    if(!body){
        throw createError({
            statusCode: 500,
            statusMessage: "Missing body",
        })    
    }

    const {error} = await validateJobUpdate(body)
    if(error){
        throw createError({
            statusCode: 500,
            statusMessage: error.details[0].message,
        })   
    }

    let resultData:any 
    
    if(body.jobRemain <= 0){
        const nowDT = new Date()
        resultData = await prisma.transactions.update({
            where:{
                id:body.transactionId
            },
            data:{
                jobRemain: body.jobRemain,
                jobFinish: nowDT
            }
        })

    }else{
        resultData = await prisma.transactions.update({
            where:{
                id:body.transactionId
            },
            data:{
                jobRemain: body.jobRemain,
            }
        })
    }





    return {
        statusCode:200,
        statusMessage:'Success',
        data:resultData
    }
})