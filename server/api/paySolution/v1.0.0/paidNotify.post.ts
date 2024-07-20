import { PrismaClient } from "@prisma/client";
import Debug from 'debug'

const debug = Debug('api:paySolution:paidNotify')
const prisma = new PrismaClient();

export default defineEventHandler(async(event) =>{

    const body = await readBody(event)
    console.log("Body: ",body)

    return {
        status:'200',
        data:body
    }
    // const body = await readBody(event)
    // if(!body){
    //     throw createError({
    //         statusCode: 500,
    //         statusMessage: "Missing body",
    //     })    
    // }
    // console.log("Body: ",body)

    // const {error} = await validatePaidNotify(body)
    // if(error){
    //     throw createError({
    //         statusCode:400,
    //         statusMessage: error.details[0].message,
    //         stack:''
    //     })   
    // }    
})