import { PrismaClient} from "@prisma/client";
import Debug from 'debug'



const prisma = new PrismaClient();
const debug = Debug('api:partner:recordsCount');

export default defineEventHandler(async(event)=>{
    const query = getQuery(event)
   
    const partner = query.partner

    let count

    if(partner!='ALL'){
        count = await prisma.partners.count({
        })
    }

    // console.log('Count: ',count)
    return {
        statusCode:200,
        statusMessage:'Success',
        totalCount: count,
    }
    
})