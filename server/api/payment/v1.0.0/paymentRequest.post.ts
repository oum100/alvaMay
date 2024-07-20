import { PrismaClient } from "@prisma/client";
import Debug from 'debug'
import { customAlphabet } from 'nanoid'
import { isNullishCoalesce } from "typescript";
import {validatePaymentRequest} from '~/alvato/models/payment'

const debug = Debug('api:asset:listAllByPartner')
const prisma = new PrismaClient();
const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',20);


export default defineEventHandler(async(event) =>{
    const body = await readBody(event)
    if(!body){
        throw createError({
            statusCode: 500,
            statusMessage: "Missing body",
        })    
    }
    const {error} = await validatePaymentRequest(body)
    if(error){
        throw createError({
            statusCode:400,
            statusMessage: error.details[0].message,
            stack:''
        })   
    }

    //Getting Asset information from database.
    const asset = await prisma.assets.findFirstOrThrow({
        where: {
            assetCode : body.assetCode,
        },
        select: {
            partnerCode:true,
            shopCode:true,
            assetCode:true,
            shop:{
                select:{
                    shopName:true,
                    paymentPartner:{
                        where:{name:body.paymentBy.toUpperCase()},
                        select:{
                            name:true,
                            paymentChannel:{
                                where:{
                                    channelId : body.channelId
                                },
                            },
                            paymentId:true,
                            secretKey:true,
                            paymentUrl:true
                        }
                    }
                }
            },
            product:{
                where:{
                    AND:[
                        {sku: body.productSku},
                        {price: body.amount}
                    ]
                },
                select:{
                    sku:true,
                    price:true
                }
            }
        }
    })

    // return asset   // For test only
    

    let resultData = null
    let url = null
    let ref_1 = nanoid()
    let paymentBy = body.paymentBy.toUpperCase()

    
    
    switch(paymentBy){
        case "CASH":        
            resultData = await prisma.paymentRequest.create({
                data: {
                    partnerCode: asset.partnerCode as string,
                    shopCode: asset.shopCode as string,
                    assetCode: asset.assetCode,
                    productSku: asset.product[0].sku,
                    amount : asset.product[0].price,
            
                    // paymentPartner: paymentName,
                    paymentBy: paymentBy,
                    ref1: ref_1,
                    ref2: "",
                    ref3: "",
                    qrText: "",
                    qrImage: ""
                }
            })   
            break;
        case "CYBERPAY":
            url = asset.shop?.paymentPartner[0].paymentUrl as string
            // ref_1 = nanoid()
        
            const paymentId = asset.shop?.paymentPartner[0].paymentId as string
            const secretKey = asset.shop?.paymentPartner[0].secretKey as string
            const paymentChannel = asset.shop?.paymentPartner[0].paymentChannel[0].channelId as string
            // paymentBy = asset.shop?.paymentPartner[0].name as string
        
            // console.log("paymentId: ",paymentId)
            // console.log("secretKey: ", secretKey)
        
            // return asset
            const cyberpay:any = await $fetch(url,{
                method: 'POST',
                headers:{
                    partnerId: paymentId,
                    secretKey: secretKey
                },
                body:{
                    payment_channel_id : paymentChannel,  // For cyberpay
                    ref_1: ref_1,
                    amount: asset.product[0].price
                }
            })
        
            
            // console.log(ref_1)
            const requestData:any = {
                partnerCode: asset.partnerCode,
                shopCode: asset.shopCode,
                assetCode: asset.assetCode,
                productSku: asset.product[0].sku,
                amount : asset.product[0].price,
        
                // paymentPartner: paymentName,
                paymentBy: paymentBy,
                ref1: ref_1,
                ref2: cyberpay.data.ref_2,
                ref3: cyberpay.data.ref_3,
                qrText: cyberpay.data.qr_text,
                qrImage: cyberpay.data.qr_image
            }
        
            resultData = await prisma.paymentRequest.create({
                data: requestData
            })            
            break;
    }

    // if(paymentBy === 'CYBERPAY'){
    //     url = asset.shop?.paymentPartner[0].paymentUrl as string
    //     ref_1 = nanoid()
    
    //     const paymentId = asset.shop?.paymentPartner[0].paymentId as string
    //     const secretKey = asset.shop?.paymentPartner[0].secretKey as string
    //     const paymentChannel = asset.shop?.paymentPartner[0].paymentChannel[0].channelId as string
    //     // paymentBy = asset.shop?.paymentPartner[0].name as string
    
    //     // console.log("paymentId: ",paymentId)
    //     // console.log("secretKey: ", secretKey)
    
    //     // return asset
    //     const cyberpay:any = await $fetch(url,{
    //         method: 'POST',
    //         headers:{
    //             partnerId: paymentId,
    //             secretKey: secretKey
    //         },
    //         body:{
    //             payment_channel_id : paymentChannel,  // For cyberpay
    //             ref_1: ref_1,
    //             amount: asset.product[0].price
    //         }
    //     })
    
        
    //     // console.log(ref_1)
    //     const requestData:any = {
    //         partnerCode: asset.partnerCode,
    //         shopCode: asset.shopCode,
    //         assetCode: asset.assetCode,
    //         productSku: asset.product[0].sku,
    //         amount : asset.product[0].price,
    
    //         // paymentPartner: paymentName,
    //         paymentBy: paymentBy,
    //         ref1: ref_1,
    //         ref2: cyberpay.data.ref_2,
    //         ref3: cyberpay.data.ref_3,
    //         qrText: cyberpay.data.qr_text,
    //         qrImage: cyberpay.data.qr_image
    //     }
    
    //     resultData = await prisma.paymentRequest.create({
    //         data: requestData
    //     })
    // }
    
 
    return {
        statusCode:200,
        statusMessage:'Success',
        data:resultData
    }
    
})
