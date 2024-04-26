import Debug from 'debug'
import { PrismaClient,Prisma } from "@prisma/client"
import {validAppKey} from '~/alvato/auth/apiAuth.ts'

const debug = Debug('api:host:getAll')
const prisma = new PrismaClient()


export default defineEventHandler(async(event)=>{
    // Verify appKey and appSecret
    // const isValidKey= await validAppKey(event)

    const getAll = await prisma.mqtts.findMany({
    })

    return {data:getAll}
})