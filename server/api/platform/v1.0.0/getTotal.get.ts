import Debug from 'debug'
import { PrismaClient,Prisma } from "@prisma/client";

const debug = Debug('api:platform:countAll')
const prisma = new PrismaClient();

export default defineEventHandler(async(event)=>{
    const countItems = await prisma.$transaction([
        prisma.partners.count(),
        prisma.shops.count(),
        prisma.assets.count(),
        prisma.transactions.count(),
        prisma.devices.count(),
        prisma.users.count(),
        prisma.configs.count(),
        prisma.hosts.count(),
        prisma.mqtts.count(),
        prisma.wifis.count(),
    ])

    return {
        data:{
            totalPartner: countItems[0],
            totalShop: countItems[1],
            totalAsset: countItems[2],
            totalTransaction: countItems[3],
            totalDevice:countItems[4],
            totalUser: countItems[5],
            totalConfig: countItems[6],
            totalHost: countItems[7],
            totalMqtt: countItems[8],
            totalWifi: countItems[9]
        }
    }
})