/*
import {NuxtAuthHandler}from '#auth'
import GithubProvider from 'next-auth/providers/github'
import twitchProvider from 'next-auth/providers/twitch'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient } from "@prisma/client";
import bcrypt  from 'bcrypt'
// import {alvatoStore} from '@/stores/alvatoStore'
import argon2 from 'argon2'


const prisma = new PrismaClient();

export default NuxtAuthHandler({
    secret: useRuntimeConfig().AUTH_SECRET,

    pages:{
        signIn: "/login",
        
    //     // signOut: { path: '/logout', method: 'post'},
    //     // signUp: { path: '/logout', method: 'post'},
    //     // refresh: { path: '/logout', method: 'post'},
    //    // error: "/auth/error"
    //    verifyRequest:  "/auth/verify-request"
        // newUser: "/register"

    },

    providers:[
        //@ts-expect-error
        GithubProvider.default({
           clientId:  useRuntimeConfig().public.GITHUB_CLIENT_ID,
           clientSecret: useRuntimeConfig().GITHUB_CLIENT_SECRET
        }),

    //    //@ts-expect-error
    //     twitchProvider.default({
    //         clientId:  useRuntimeConfig().public.TWITCH_CLIENT_ID,
    //         clientSecret: useRuntimeConfig().TWITCH_CLIENT_SECRET
    //     }),

        //@ts-expect-error
        CredentialsProvider.default({
            name: 'credentials',
            credentials: {},
            async authorize(credentials:{email:string, password:string}){
                //below user is for test only
                const userInfo = await prisma.users.findUnique({
                    where:{
                        email:credentials.email,
                    },
                    include:{
                        partner:true,
                        shop:true
                    }
                    // select:{
                    //     name:true,
                    //     email:true,
                    //     password:true,
                    //     image:true,    
                    //     isActive:true,
                    //     organize:true,
                    //     role:true,
                    //     permission:true,
                    //     partnerCode: true,      
                    // }
                })
                

                if(!userInfo){
                    throw createError({
                        statusCode:401, 
                        statusMessage: "User not found."
                    })
                }

                // const isValid = await bcrypt.compare(credentials.password,user.password)
                const isValid = await argon2.verify(userInfo.password,credentials.password)

                if(!isValid){
                    throw createError({
                        statusCode:401, 
                        statusMessage: "Unauthorized"
                    })
                }

                console.log("UserInfo: ",userInfo)
                // const user = userInfo
                const user = {
                    name: userInfo.name,
                    email: userInfo.email,
                    image: userInfo.image,
                    isActive: userInfo.isActive,
                    organization: userInfo.organization,
                    role: userInfo.role,
                    permission: userInfo.permission,
                    partnerCode: userInfo.partnerCode,
                    // partnerName: userInfo.partner?.partnerName
                }

                return {
                    ...user,
                    password:undefined
                }
            }
        })
    ],

    session:{
        strategy:"jwt",
    },


    callbacks:{
        async jwt({token,user,account,profile}){
            // console.log('Token Before: ',token)
            // console.log("Account: ",account)
            // console.log("Profile: ",profile)
            if(user){
                // console.log("jwt callback: ",user)
                token = {
                    ...token,
                    ...user
                }
            }
            // console.log('Token After: ',token)
            return token
        },

        async session({session,token}){
            // console.log('Session Before: ',session)
            session.user = {
                ...token,
                ...session.user,
            }
            // console.log('Session After: ',session)
            return session
        },
    },
    
})
*/






import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import { NuxtAuthHandler } from '#auth'
import { PrismaClient } from "@prisma/client";
import argon2 from 'argon2'

const prisma = new PrismaClient();

export default NuxtAuthHandler({
    secret: useRuntimeConfig().AUTH_SECRET,

    pages:{
        signIn: "/login",
    },

    providers: [
        //@ts-expect-error
        GithubProvider.default({
            clientId:  useRuntimeConfig().public.GITHUB_CLIENT_ID,
            clientSecret: useRuntimeConfig().GITHUB_CLIENT_SECRET
        }),

        
        //@ts-expect-error
        
        // CredentialsProvider.default({
        //     // The name to display on the sign in form (e.g. 'Sign in with...')
        //     name: 'Credentials',
        //     // The credentials is used to generate a suitable form on the sign in page.
        //     // You can specify whatever fields you are expecting to be submitted.
        //     // e.g. domain, username, password, 2FA token, etc.
        //     // You can pass any HTML attribute to the <input> tag through the object.
        //     credentials: {
        //         // username: { label: 'Email', type: 'email', placeholder: '(hint: jsmith@gmail.com)' },
        //         // password: { label: 'Password', type: 'password', placeholder: '(hint: hunter2)' }
        //     },

        //     authorize (credentials:{email:string, password:string}) {
        //         // You need to provide your own logic here that takes the credentials
        //         // submitted and returns either a object representing a user or value
        //         // that is false/null if the credentials are invalid.
        //         // NOTE: THE BELOW LOGIC IS NOT SAFE OR PROPER FOR AUTHENTICATION!
        
        //         const userInfo = { id: '1', name: 'J Smith', email: 'jsmith@gmail.com', password: 'hunter2',role:'admin' }
        
        //         if (credentials?.email === userInfo.email && credentials?.password === userInfo.password) {
        //             // Any object returned will be saved in `user` property of the JWT
        //             // console.log(user)
        //             const user = {
        //                 id:userInfo.id,
        //                 name:userInfo.name,
        //                 email: userInfo.email,
        //                 role: userInfo.role
        //             }

        //             // return user
        //             return Promise.resolve(user)
                        
                    
        //         } else {
        //             console.error('Warning: Malicious login attempt registered, bad credentials provided')
            
        //             // If you return null then an error will be displayed advising the user to check their details.
        //             return null
            
        //             // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        //         }
        //     }

            
        // }),

        CredentialsProvider.default({
            name: 'credentials',
            credentials: {},
            async authorize(credentials:{email:string, password:string}){
                //below user is for test only
                const userInfo = await prisma.users.findUnique({
                    where:{
                        email:credentials.email,
                    },
                    include:{
                        partner:true,
                        shop:true
                    }
                    // select:{
                    //     name:true,
                    //     email:true,
                    //     password:true,
                    //     image:true,    
                    //     isActive:true,
                    //     organize:true,
                    //     role:true,
                    //     permission:true,
                    //     partnerCode: true,      
                    // }
                })
                

                if(!userInfo){
                    throw createError({
                        statusCode:401, 
                        statusMessage: "User not found."
                    })
                }

                // const isValid = await bcrypt.compare(credentials.password,user.password)
                const isValid = await argon2.verify(userInfo.password,credentials.password)

                if(!isValid){
                    throw createError({
                        statusCode:401, 
                        statusMessage: "Unauthorized"
                    })
                }

                console.log("UserInfo: ",userInfo)
                // const user = userInfo
                const user = {
                    name: userInfo.name,
                    email: userInfo.email,
                    image: userInfo.image,
                    isActive: userInfo.isActive,
                    organization: userInfo.organization,
                    role: userInfo.role,
                    permission: userInfo.permission,
                    partnerCode: userInfo.partnerCode,
                    // partnerName: userInfo.partner?.partnerName
                }

                return {
                    ...user,
                    password:undefined
                }
            }
        })

        
    ],

    session:{
        strategy:"jwt",
    },

    callbacks:{
        // async jwt({token, user, account, profile}){

        //     return token
        // },

        // session({session,token}){
        //     return session
        // }


        // Callback when the JWT is created / updated, see https://next-auth.js.org/configuration/callbacks#jwt-callback
        jwt: async({token, user}) => {
            console.log("user1: ",user)
            const isSignIn = user ? true : false;
            if (isSignIn) {
                token.jwt = user ? (user as any).access_token || '' : '';
                token.id = user ? user.id || '' : '';
                token.role = user ? (user as any).role || '' : '';
            }
            // return Promise.resolve(token);
            console.log("user2: ",user)
            return token={
                ...token,
                ...user
            }
        },
        // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
        session: async ({session, token}) => {
            (session as any).role = token.role;
            (session as any).uid = token.id;
            return Promise.resolve(session);
        },
    }
})

