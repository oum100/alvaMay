import { PrismaClient} from "@prisma/client";
import Debug from 'debug'



const prisma = new PrismaClient();
const debug = Debug('api:asset:recordsCount');

export default defineEventHandler(async(event)=>{
    const query = getQuery(event)
   
    const partner = query.partner
    const shop = query.shop

    // console.log("recordCount->partner:",partner)
    // console.log("recordCunnt->shop:",shop)

    let count

    if(shop != 'ALL' && partner == 'ALL'){
        count = await prisma.assets.count({
            where:{
                shopCode: shop as string
            }
        })

       
    }else if(partner!='ALL' && shop == 'ALL'){
        count = await prisma.assets.count({
            where:{ 
                partnerCode : partner as string  
            }
        })
    }else{
        count = await prisma.assets.count({})
    }

    // console.log('Count: ',count)
    return {
        totalCount: count,
    }
    
})