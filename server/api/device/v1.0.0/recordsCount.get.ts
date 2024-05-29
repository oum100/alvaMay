import { PrismaClient} from "@prisma/client";
import Debug from 'debug'



const prisma = new PrismaClient();
const debug = Debug('api:device:recordsCount');

export default defineEventHandler(async(event)=>{
    const query = getQuery(event)
   
    const partner = query.partner

    let count

    if(partner!='ALL'){
        count = await prisma.devices.count({
            where:{ 
                partnerCode : partner as string  
            }

        })
    }else{
        count = await prisma.devices.count({})
    }

    // console.log('Count: ',count)
    return {
        statusCode:200,
        statusMessage:'Success',
        totalCount: count,
    }
    
})