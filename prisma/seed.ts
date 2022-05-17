import { PrismaClient } from '@prisma/client'
import { genSaltSync, hashSync } from 'bcrypt'
import adminList from './data/user'

const prisma = new PrismaClient()


async function main () {
    for (const data of adminList) {
        const admin = await prisma.user.create({
            data : data
        })
    }
    console.log ('Admin sudah dibuat')
}

main ()
    .catch (e => {
        console.error(e)
        process.exit()
    })
    .finally(async () => {
        await prisma.$disconnect()
    })