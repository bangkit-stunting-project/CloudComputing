import { Request, Response } from 'express'
import { Prisma, PrismaClient } from '@prisma/client'
import { decrypt } from './auth'
const prisma = new PrismaClient()

export const register = async (req: Request, res : Response) => {
    const data = req.body as Prisma.UserCreateInput
    const passwordHashed = await decrypt(data.password)
    prisma.user.create({
        data: {
            email : data.email,
            password : passwordHashed,
        }
    })
    .then(user => {
        res.status(400).send({
            message : `${user.email} telah berhasil dibuat`
        })
    })
}