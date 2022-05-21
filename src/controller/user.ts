import { Request, Response } from 'express'
import { Prisma, PrismaClient } from '@prisma/client'
import { decrypt, getId } from './auth'
const prisma = new PrismaClient()

// Register 
export const register = async (req: Request, res : Response) => {
    const data = req.body 
    const passwordHashed = await decrypt(data.password)
    prisma.user.create({
        data: {
            email : data.email,
            password : passwordHashed,
            userDetails : {
                create : {
                    jenisKelamin : data.jenisKelamin,
                    namaLengkap : data.namaLengkap,
                    tanggalLahir: new Date (data.tanggalLahir),
                    tempatLahir : data.tempatLahir,
                }
            }
        }
    })
    .then(user => {
        res.status(400).send({
            message : `${user.email} telah berhasil dibuat`
        })
    })
}

// Read Detail Profile 
export const userDetail = async (req: Request, res: Response) => {
    const data = req.body
    const token = req.headers['auth'] as string
    const userId = getId(token)

    await prisma.userDetails.findUnique({
        where: {
            userId : parseInt(userId)
        }
    })
    .then(user => {
        if (user === undefined) {
            res.status(404).send ({ error : 'Not Found!'})
            return
        }
        res.send({ userDetail : user })
    })
}

// Update User Details
export const updateUserDetail = async (req : Request, res : Response) => {
    const data = req.body 
    const token = req.headers['auth'] as string
    const userId = getId(token)
    
    await prisma.userDetails.update({
        where : {
            userId : parseInt(userId)
        },
        data : {
            jenisKelamin : data?.jenisKelamin,
            namaLengkap : data?.namaLengkap,
            tanggalLahir : new Date(data?.tanggalLahir),
            tempatLahir : data?.tempatLahir            
        }
    }).then (userDetails => {
        res.send({ message : `${userDetails.namaLengkap} berhasil diperbaharui.`})
    }).catch (err => {
        res.send(err)
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code == 'P2015') {
                res.status(404).send({ message : 'Not Found!'})
            }
        }
    })
}