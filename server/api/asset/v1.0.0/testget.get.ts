import Debug from 'debug'
import {validAppKey} from '~/alvato/auth/apiAuth'
import { PrismaClient,Prisma } from "@prisma/client";
import {defaultcfg} from '~/alvato/models/defaultCFG'
import useUtilities from '~/composables/useUtilities';

// import {defaultcfg as cfg} from '~/alvato/models/host.ts'
const debug = Debug('api:asset:getAll')
const prisma = new PrismaClient();


// console.log("cfg: ",cfg)

export default defineEventHandler(async(event)=>{
    const query = await getQuery(event)

    // const [assets,count] = await prisma.$transaction([
    //     prisma.assets.findMany({
    //         where: {
    //             partner:{
    //                 partnerName : query.partner as string
    //             }
    //         },          
    //     }),
    //     prisma.assets.count({
    //         where: {
    //             partner:{
    //                 partnerName : query.partner as string
    //             }
    //         },
    //     }),

    // ])
    
    // For find unique without duplicate value
    // const result = await prisma.assets.findMany({
    //     distinct:['partnerCode'],
    //     select:{
    //         partner:{
    //             select:{
    //                 partnerCode:true,
    //                 partnerName:true
    //             }
    //         }
    //     }
    // })

    // const result = await prisma.partners.findMany({
    //     distinct:['partnerCode'],
    //     select:{
    //         partnerCode:true,
    //         partnerName:true
    //     }
    // })

    // const result = await prisma.shops.findMany({
    //     distinct:['shopCode'],
    //     select:{
    //         shopCode:true,
    //         shopName:true
    //     }
    // })
    
    // const {transformQSelectOption} = useUtilities()
    
    // console.log('result: ',result)

    // const newObj = result.map(transformQSelectOption)

    // const newObj = result.map(myFunc)

    // function myFunc(item:any){
    //     // console.log('item: ',item)
    //     const newO = Object.assign({},{label:item.partnerName},{value:item.partnerCode})
    //     // console.log("newO ",newO)
    //     return newO
    // }

    // let newObj ={}
    // result.forEach(item => {
    //     console.log('item: ',item)
    //     newObj = Object.assign({},{label:item.partnerName},{value:item.partnerCode})
        
    // })

    // console.log('newObj: ',newObj)

    //For counting record widh condition
    const result = await prisma.assets.count({
        where: {
            partnerCode : query.partner as string
        },
    })

    return {
        data:result
    }

    // return {
    //     data:{
    //         count:count,
    //         assets:assets
    //     }
    // }
})