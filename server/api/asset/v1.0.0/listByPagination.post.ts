import Debug from 'debug'
import { PrismaClient,Prisma } from "@prisma/client";
import {validAppKey} from '~/alvato/auth/apiAuth'
import {validateListByPagination} from '~/alvato/models/asset'

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
    let sortPartnerName = 'asc'
    let sortShopName = 'asc'
    let sortAssetName = 'asc'
    console.log("api descending: ",descending)
    console.log("api sort: ",sortBy)


    let orderBy:any
    

    if(sortBy == 'assetName'){
        descending?orderBy=[{assetName:'desc'}]:orderBy=[{assetName:'asc'}]
        
    }else{
        orderBy = [
            // {partner:{partnerName:'asc'}},
            // {shop:{shopName:'asc'}},
            {assetName:'asc'}
        ]
    }
    console.log("This orderBy: ",orderBy)


    if(partnerCode && shopCode){
        let assets,count 

        if(shopCode != 'ALL' && partnerCode == 'ALL'){
            assets = await prisma.assets.findMany({
                skip:skip,
                take:take,
                orderBy: orderBy,
                // orderBy:{
                //     assetName: "desc"
                // },
                where: {
                    shopCode : shopCode as string
                },
                select:{
                    assetCode:true,
                    assetName:true,
                    assetType:true,
                    assetStatus:true,
                    partnerCode:true,
                    shopCode:true,
                    configCode:true,
                    createdAt:false,
                    updatedAt:true,
                    partner:{select:{partnerName:true}},
                    shop:{select:{shopName:true}},
                    device:{select:{
                        deviceName:true,
                        deviceMac:true
                    }},
                    machine:{
                        select:{
                            name:true,
                            type:true,
                        }
                    },
                    product:{
                        select:{
                            sku:true,
                            price:true,
                        }
                    }
                }
            })
            
        }else if(partnerCode != 'ALL' && shopCode == 'ALL'){
            assets = await prisma.assets.findMany({
                skip:skip,
                take:take,
                orderBy: orderBy,
                // orderBy:[
                //     {partner:{partnerName: "asc"}},
                //     {shop:{shopName: "asc"}},
                //     {assetName: "asc"},
                // ],
                where: {
                    partnerCode : partnerCode as string
                },
                select:{
                    assetCode:true,
                    assetName:true,
                    assetType:true,
                    assetStatus:true,
                    partnerCode:true,
                    shopCode:true,
                    configCode:true,
                    createdAt:false,
                    updatedAt:true,
                    partner:{select:{partnerName:true}},
                    shop:{select:{shopName:true}},
                    device:{select:{
                        deviceName:true,
                        deviceMac:true
                    }},
                    machine:{
                        select:{
                            name:true,
                            type:true,
                        }
                    },
                    product:{
                        select:{
                            sku:true,
                            price:true,
                        }
                    }
                }
            })
        }else if(partnerCode != 'ALL' && shopCode != 'ALL' ){
            assets = await prisma.assets.findMany({
                skip:skip,
                take:take,
                orderBy: orderBy,
                // orderBy:[
                //     {partner:{partnerName: "asc"}},
                //     {shop:{shopName: "asc"}},
                //     {assetName: "asc"},
                // ],
                where: {
                    partnerCode: partnerCode as string,
                    shopCode : shopCode as string
                },
                select:{
                    assetCode:true,
                    assetName:true,
                    assetType:true,
                    assetStatus:true,
                    partnerCode:true,
                    shopCode:true,
                    configCode:true,
                    createdAt:false,
                    updatedAt:true,
                    partner:{select:{partnerName:true}},
                    shop:{select:{shopName:true}},
                    device:{select:{
                        deviceName:true,
                        deviceMac:true
                    }},
                    machine:{
                        select:{
                            name:true,
                            type:true,
                        }
                    },
                    product:{
                        select:{
                            sku:true,
                            price:true,
                        }
                    }
                }
            })        
        }else{
            
            assets = await prisma.assets.findMany({
                skip:skip,
                take:take,
               
                orderBy: orderBy,
                // orderBy:[
                //     {   partner:{
                //             partnerName: 'asc'
                //         }
                //     },
                //     {shop:{shopName: "asc"}},
                //     {assetName: "asc"},
                // ],
                
                select:{
                    assetCode:true,
                    assetName:true,
                    assetType:true,
                    assetStatus:true,
                    partnerCode:true,
                    shopCode:true,
                    configCode:true,
                    createdAt:false,
                    updatedAt:true,
                    partner:{select:{partnerName:true}},
                    shop:{select:{shopName:true}},
                    device:{select:{
                        deviceName:true,
                        deviceMac:true
                    }},
                    machine:{
                        select:{
                            name:true,
                            type:true,
                        }
                    },
                    product:{
                        select:{
                            sku:true,
                            price:true,
                        }
                    }
                }
            })
        }
        
        return {
            statusCode:200,
            statusMessage:'Success',
            data:assets
        }
    }
})