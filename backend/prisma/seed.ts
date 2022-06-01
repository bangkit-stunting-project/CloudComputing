import { PrismaClient } from '@prisma/client'
import { genSaltSync, hashSync } from 'bcrypt'
import adminList from './data/user'
import standardGiziList from './data/standardGizi'

const prisma = new PrismaClient()


async function main () {
    for (const data of adminList) {
        const admin = await prisma.user.create({
            data : data
        })
    }
    console.log ('Admin sudah dibuat')

    for (const data of standardGiziList) {
        await prisma.standarGizi.create({
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