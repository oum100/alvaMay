import Debug from 'debug'
import { PrismaClient,Prisma } from "@prisma/client"
import {validateListByPagination} from '~/alvato/models/transaction'

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

    const {error} = await validateListByPagination(body)
    if(error){
        throw createError({
            statusCode: 500,
            statusMessage: error.details[0].message,
        })   
    }


    const resultData = await prisma.transactions.findMany({
        include:{
            asset:{
                include:{
                    product:true
                }
            },
            cyberpayPaidNotify:{
                select:{
                    transaction_id:true,
                    ref_1:true,
                    ref_2:true,
                    ref_3:true,
                    service_fee:true,

                    paymentRequest:{
                        select:{
                            id:true,
                            productSku:true,
                            amount:true,
                            qrText:true,
                            qrImage:true
                        }
                    }
                }
            },
            cashPaidNotify:{
                select:{transaction_id:true}
            },
            scbPaidNotify:{
                include:{
                    paymentRequest:true
                }
            }
        }
    })




    return {
        statusCode:200,
        statusMessage:'Success',
        data:resultData
    }
})