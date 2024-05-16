import { PrismaClient} from "@prisma/client";
import Debug from 'debug'



const prisma = new PrismaClient();
const debug = Debug('api:shop:recordsCount');

export default defineEventHandler(async(event)=>{
    const query = getQuery(event)
   
    const partner = query.partner

    let count

    if(partner!='ALL'){
        count = await prisma.users.count({
            where:{ 
                partnerCode : partner as string  
            }
        })
    }else{
        count = await prisma.users.count({})
    }

    // console.log('Count: ',count)
    return {
        totalCount: count,
    }
    
})