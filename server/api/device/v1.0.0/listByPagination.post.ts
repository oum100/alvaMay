import Debug from 'debug'
import { PrismaClient,Prisma } from "@prisma/client";
import {validAppKey} from '~/alvato/auth/apiAuth'
import {validateListByPagination} from '~/alvato/models/device'

import {defaultcfg} from '~/alvato/models/defaultCFG'

const debug = Debug('api:asset:listAllByPartner')
const prisma = new PrismaClient();

export default defineEventHandler(async(event)=>{
    debug("defaultcfg: ",defaultcfg)

    const body = await readBody(event)

    const {error} = await validateListByPagination(body)
    if(error){
        throw createError({
            statusCode:400,
            statusMessage: error.details[0].message,
            stack:''
        })   
    }

    //define partnerCode and shopCode
    const partnerCode = body.partnerCode 
    const shopCode = body.shopCode

    // Calculate skip
    const requestPage = body.page
    const rowsPerPage = body.rowsPerPage != null? parseInt(body.rowsPerPage):20

    const skip = requestPage 
    const take = rowsPerPage
    // console.log("skip :",skip)
    // console.log('take',take)

    const sortBy = body.sortBy
    const descending = body.descending

    console.log("api descending: ",descending)
    console.log("api sort: ",sortBy)


    let orderBy:any
    

    if(sortBy == 'deviceName'){
        descending?orderBy=[{deviceMac:'desc'}]:orderBy=[{deviceMac:'asc'}]
        
    }else{
        orderBy = [
            // {partner:{partnerName:'asc'}},
            // {shop:{shopName:'asc'}},
            {deviceMac:'asc'}
        ]
    }
    console.log("This orderBy: ",orderBy)


    if(partnerCode && shopCode){
        let result,count 

        if(shopCode != 'ALL' && partnerCode == 'ALL'){
            result = await prisma.devices.findMany({
                skip:skip,
                take:take,
                orderBy: orderBy,
                where: {
                    shopCode : shopCode as string
                },
                select:{
                    deviceName:true,
                    deviceMac:true,
                    deviceType:true,
                    deviceStatus:true,
                    board:true,
                    firmware:true,
                    replaceBy:true,
                    replacedAt:true,
                    asset:{select:{assetName:true}}
                }
            })
            
        }else if(partnerCode != 'ALL' && shopCode == 'ALL'){
            result = await prisma.devices.findMany({
                skip:skip,
                take:take,
                orderBy: orderBy,
                where: {
                    partnerCode : partnerCode as string
                },
                select:{
                    deviceName:true,
                    deviceMac:true,
                    deviceType:true,
                    deviceStatus:true,
                    board:true,
                    firmware:true,
                    replaceBy:true,
                    replacedAt:true,
                    asset:{select:{assetName:true}}
                }
            })
        }else if(partnerCode != 'ALL' && shopCode != 'ALL' ){
            result = await prisma.devices.findMany({
                skip:skip,
                take:take,
                orderBy: orderBy,
                where: {
                    partnerCode: partnerCode as string,
                    shopCode : shopCode as string
                },

            })        
        }else{
            result = await prisma.devices.findMany({
                skip:skip,
                take:take,
               
                orderBy: orderBy,
                select:{
                    deviceName:true,
                    deviceMac:true,
                    deviceType:true,
                    deviceStatus:true,
                    board:true,
                    firmware:true,
                    replaceBy:true,
                    replacedAt:true,
                    asset:{select:{assetName:true}}
                }
                
            })
        }
        
        return {
            statusCode:200,
            statusMessage:'Success',
            data:result
        }
    }
})