import Debug from 'debug'
import { PrismaClient,Prisma } from "@prisma/client"

const debug = Debug('api:asset:getPartnerQSelectOption')
const prisma = new PrismaClient()


function transformQSelectOption(item:any){
    // console.log('item: ',item)
    const newObj = Object.assign({},{label:item.partnerName},{value:item.partnerCode})
    // console.log("newO ",newO)
    return newObj
}

export default defineEventHandler(async(event)=>{
    const resultList = await prisma.partners.findMany({
        distinct:['partnerCode'],
        select:{
            partnerCode:true,
            partnerName:true
        }
    })

    const getList = resultList.map(transformQSelectOption)

    return {data:getList}
})