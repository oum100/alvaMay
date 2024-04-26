// import {Partner, JSONResponse} from '~~/alvato/misc/types'
import bcrypt from 'bcrypt'

export default () => {
    return {
        getPartnerByUuid,
        createPartner,
        partnerUserList,
        getShopByPartner,
        getAssetByPartner,
        getRowsCount
    }
}

// Api Authentication appKey and appSecret

/*============================== Platform Level internal API call =============================*/
async function getShopByPartner(partnerCode:string){
    const shops = await useFetch('/api/shop/v1.0.0/getAllByPartner',{
        query:{
            partnerCode:partnerCode
        }
    })
    return shops
}

async function getAssetByPartner(partnerCode:string){
    const assets = await useFetch('/api/asset/v1.0.0/getAllByPartner',{
        query:{
            partnerCode:partnerCode
        }
    })
    return assets
}


/*============================== Partner API ==============================*/
// async function getPartnerByUuid(uuid: string): Promise<JSONResponse> {
async function getPartnerByUuid(uuid: string) {
    const partner =  await useFetch('/api/partner/v1.0.0/getByUuid',{
        method: 'POST',
        body:{uuid:uuid},
        cache: 'no-cache'
    })

    // console.log("partner: ",partner)

    return partner
}

async function createPartner(uuid:string, name:string){
    const partner = await useFetch('/api/partner/v1.0.0/newPartner',{
        method:'POST',
        body: {
            uuid:uuid,
            name:name
        }
    })
    console.log("partner: ",partner)
    return partner
}

//Partner User API
async function partnerUserList(partnerCode: string){
    const users = await useFetch('/api/partner/v1.0.0/partnerUserList',{
        method:'POST',
        body:{
            partnerCode:partnerCode
        }
    })

    // return Promise.resolve(users)
    return users
}


async function getRowsCount(filter:string){
    
    const rowsCount = await useFetch('/api/asset/v1.0.0/recordsCount',{
        query:{
            filter:filter
        }
    })
    return rowsCount
    
}

async function fetchAssetData(partner:string, shop:string){
    if(shop != 'ALL'){

    }else if(partner != 'ALL'){

    }else if(shop == 'ALL' && partner == 'ALL'){

    }
}

async function isPartnerOwner(uuid:string){

}

async function isShopOwner(uuid:string){
    
}

async function isAdmin(uuid:string){

}
