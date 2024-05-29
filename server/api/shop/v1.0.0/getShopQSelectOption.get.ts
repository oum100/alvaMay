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
    const resultList = await prisma.shops.findMany({
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