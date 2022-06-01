import { Prisma } from '@prisma/client'
import { genSaltSync, hashSync } from 'bcrypt'

const adminList : Prisma.UserCreateInput[] = [
    {
        email : 'admin@stunting.co.id',
        password : hashSync('yhaAnakLuStunting', genSaltSync(10))
    },
    {
        email : 'fahriStunting@stunting.co.id',
        password : hashSync('fahriStuntingYaGesYa', genSaltSync(10))
    }
]

export default adminList