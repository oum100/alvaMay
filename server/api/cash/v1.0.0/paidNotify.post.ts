import { PrismaClient } from "@prisma/client";
import Debug from 'debug'
import {validatePaidNotify} from '~/alvato/models/cash'
import { customAlphabet } from 'nanoid'
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 24);


const prisma = new PrismaClient();
const debug = Debug('api:cyberpay:painNotify');

export default defineEventHandler(async(event) =>{
    const body = await readBody(event)
    if(!body){
        throw createError({
            statusCode: 500,
            statusMessage: "Missing body",
        })    
    }
    // console.log("Body: ",body)

    const {error} = await validatePaidNotify(body)
    if(error){
        throw createError({
            statusCode:400,
            statusMessage: error.details[0].message,
            stack:''
        })   
    }

    const asset = await prisma.assets.findFirstOrThrow({
        where:{
            assetCode: body.assetCode
        },
        include:{
            product:{
                where:{
                    sku: body.productSku
                }
            }
        }
    })


    //Prisma update here
    const nowDT = new Date()
    const resultData = await prisma.cashPaidNotify.create({
        data:{
            transaction_id:nanoid(),
            transaction:{
                create:{
                    partnerCode: asset.partnerCode as string,
                    shopCode: asset.shopCode as string,
                    assetCode: body.assetCode,
                    productSku: asset.product[0].sku,
                    amount: asset.product[0].price ,
                    paymentBy: "CASH",
                    // paymentRequestId: paymentReq.id,

                    qrGenId: body.qrGenId || "",
                    wallet: body.wallet || "",
                    status: body.status || "PAID",
                    jobStart: nowDT ,   
                    jobRemain: asset.product[0].qty
                }
            }
        }
    })



    //Return as partner notification format
    const res = {
        status:true,
        message:'success',
        data:{
            transaction_id:body.transaction_id
        }
    }

    return res  

})