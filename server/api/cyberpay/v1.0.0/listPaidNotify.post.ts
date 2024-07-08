import { PrismaClient } from "@prisma/client";
import Debug from 'debug'
import paymentRequestPost from "../../payment/v1.0.0/paymentRequest.post";
// import {validatePaidNotify} from '~/alvato/models/cyberpay'

const debug = Debug('api:cyberpay:paidNotify')
const prisma = new PrismaClient();

export default defineEventHandler(async(event) =>{
    const resultData = await prisma.cyberpayPaidNotify.findMany({
        include:{
            paymentRequest:{
                select:{
                    paymentName:true,
                    ref1:true,
                    ref2:true,
                    ref3:true,
                    amount:true
                }
            }
        }
    })

    return resultData
})