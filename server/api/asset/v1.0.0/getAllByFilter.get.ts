import Debug from 'debug'
import {validAppKey} from '~/alvato/auth/apiAuth'
import { PrismaClient,Prisma } from "@prisma/client";
import {defaultcfg} from '~/alvato/models/defaultCFG'

const prisma = new PrismaClient();

export default defineEventHandler(async(event)=>{
    const query = await getQuery(event)

    const partnerCode = query.partnerCode || null
    const shopCode = query.shopCode || null
    console.log('Query PartnerCode: ',partnerCode)
    console.log('Query ShopCode: ',shopCode)

    const partnerName = query.partnerName || null
    const shopName = query.shopName || null
    console.log('Query PartnerName: ',partnerName)
    console.log('Query ShopName: ',shopName)

    if(partnerCode && shopCode){
        let assets,count 

        if(shopCode != 'ALL' && partnerCode == 'ALL'){
            [assets,count] = await prisma.$transaction([
                prisma.assets.findMany({
                    where: {
                        shopCode : shopCode as string
                    }
                }),
                prisma.assets.count({
                    where: {
                        shopCode : shopCode as string
                    },
                })
            ])
        }else if(partnerCode != 'ALL' && shopCode == 'ALL'){
            [assets,count] = await prisma.$transaction([
                prisma.assets.findMany({
                    where: {
                        partnerCode : partnerCode as string
                    },      
                }),
                prisma.assets.count({
                    where: {
                        partnerCode : partnerCode as string
                    },
                }),
            ])
        }else if(partnerCode != 'ALL' && shopCode != 'ALL' ){
            [assets,count] = await prisma.$transaction([
                prisma.assets.findMany({
                    where: {
                        partnerCode : partnerCode as string,
                        shopCode    : shopCode as string
                    },      
                }),
                prisma.assets.count({
                    where: {
                        partnerCode : partnerCode as string,
                        shopCode     : shopCode as string
                    },
                }),
            ])           
        }else{
            [assets,count] = await prisma.$transaction([
                prisma.assets.findMany(),
                prisma.assets.count(),
            ])
        }
        
        return {
            data:{
                assets: assets,
                count: count
            }
        }
    }else{
        return  {
            error:"No valid parameters provided"
        }
    }
})