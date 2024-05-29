import { getServerSession } from "#auth"

export default defineEventHandler( async(event) =>{
    const session = await getServerSession(event)

    if(!session){
        return {status:'unAuthentication'}
    }

    return {
        statusCode:200,
        statusMessage:'Success',
        data:session
    }
    // return {
    //     email: session.user?.email,
    //     name: session.user?.name,
    //     uuid:  session.user?.uuid,
    // }
})