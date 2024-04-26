import Debug from 'debug'
import { PrismaClient,Prisma } from "@prisma/client"
import {validAppKey} from '~/alvato/auth/apiAuth.ts'
import {validateNewWiFi} from '~/alvato/models/wifi.ts'

const debug = Debug('api:config:newWiFi')
const prisma = new PrismaClient()


export default defineEventHandler(async(event)=>{
    // Verify appKey and appSecret
    // const isValidKey= await validAppKey(event)

    const wifi = await prisma.wifis.findMany({
    })

    return {data:wifi}
})