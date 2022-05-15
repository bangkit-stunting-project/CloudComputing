import { PrismaClient } from '@prisma/client'
import {genSaltSync, hashSync} from "bcrypt"

const prisma = new PrismaClient()

// Making defaul user login 
async function name(params:type) {
    const admin = await prisma.user.upsert({
        where: { username : 'admin'},
        update :{},
        create : {
            email : 'admin@stunting.com',
            password : hashSync('bangkitStuntingProject2022', genSaltSync(10)),
            userDetails : {
                create : {
                    namaLengkap : 'Admin yang Stunting',
                    jenisKelamin : 'F',
                    tempatLahir : 'Jakarta',
                    tanggalLahir : new Date(`2022-12-12`),
                    

                }
            }
        },

    })
}