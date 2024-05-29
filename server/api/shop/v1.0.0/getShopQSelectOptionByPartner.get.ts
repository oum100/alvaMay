import Debug from 'debug'
import { PrismaClient,Prisma } from "@prisma/client"


const debug = Debug('api:asset:getShopQSelectOption')
const prisma = new PrismaClient()

function transformQSelectOption(item:any){
    // console.log('item: ',item)
    const newObj = Object.assign({},{label:item.shopName},{value:item.shopCode})
    // console.log("newO ",newO)
    return newObj
}

export default defineEventHandler(async(event)=>{
    const query = await getQuery(event)
    // // debug("query: ",query)
    // console.log("query: ",query)

    if(!query.partnerCode){
        throw createError({
            statusCode: 500,
            statusMessage: "Missing parameter",
        })   
    }

    const resultList = await prisma.shops.findMany({
        where:{partnerCode:query.partnerCode as string},
        distinct:['shopCode'],
        select:{
            shopCode:true,
            shopName:true
        }
    })

    // console.log('resultList: ',resultList)
    const getList = resultList.map(transformQSelectOption)

    return {
        statusCode:200,
        statusMessage:'Success',
        data:getList
    }
})