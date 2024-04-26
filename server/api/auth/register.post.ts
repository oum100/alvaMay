import Debug from 'debug'
import {validateUserRegister} from '~/alvato/models/user'
import  bcrypt  from 'bcrypt'
import { PrismaClient,Prisma } from "@prisma/client";
import { customAlphabet } from 'nanoid'
import argon2 from 'argon2'

const prisma = new PrismaClient();
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwzyzABCDEFGHIGKLMNOPQRSTUVWXYZ')

export default defineEventHandler( async(event)=>{

    const body = await readBody(event)
    if(!body){
        throw createError({
            statusCode: 500,
            statusMessage: "Missing body",
        })
    }

    const {error} = await validateUserRegister(body)

    if(error){
        throw createError({
            statusCode:400,
            statusMessage: "Bad requested",
            message: error.details[0].message
        })
    }

    // Create salt and hash for user 
    // const salt = await bcrypt.genSaltSync(10);
    // const hashPass = await bcrypt.hash(body.password ,salt)  


    const hashPass = await argon2.hash(body.password)
    console.log(hashPass)

    // const user = {
    //     uuid: nanoid(10),
    //     email: body.email as string,
    //     password: hashPass as string,
    //     name: body.name as string,
    //     profiles:{create:{
    //             firstName:  body.name as string,
    //         }
    //     }}
    // }

    // Create user and profile
    const saveUser = await prisma.users.create({
        data: {
            uuid: nanoid(10),
            email: body.email.toLowerCase(),
            password: hashPass as string,
            name: body.name as string,
            partnerCode: body.partnerCode || '',
            organization: body.organize || 'PARTNER',
            role: body.role || 'OWNER',
            permission: body.permission || 'CRUD',
            profile: {
                create:{
                    firstName: body.name as string
                }
            }            
        }
    })
    
    
    if(!saveUser){
        throw createError({
            statusCode:500,
            statusMessage: "Unique constraint violation",
            message: "This user already exist"
        })
    }

    // return {...saveUser,password:undefined}
    return {
        statusCode:200,
        statusMessage: "Completed registration",
        data:{
            ...saveUser,
            password:undefined
        }
    }
})