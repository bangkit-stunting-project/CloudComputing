import { PrismaClient } from '@prisma/client'
import { genSaltSync, hashSync } from 'bcrypt'
import adminList from './data/user'
import standardGiziList from './data/standardGizi'
import { giziMakananList } from './data/giziMakanan'

const prisma = new PrismaClient()


async function main () {
    for (const data of adminList) {
        const admin = await prisma.user.create({
            data : data,
            include: {
                userDetails: true
            }
        })
    }
    console.log ('Admin sudah dibuat')

    for (const data of standardGiziList) {
        await prisma.standarGizi.create({
            data : data
        })
    }

    for (const data of giziMakananList) {
        await prisma.giziMakanan.create({
            data : data
        })
    }
}

main ()
    .catch (e => {
        console.error(e)
        process.exit()
    })
    .finally(async () => {
        await prisma.$disconnect()
    })