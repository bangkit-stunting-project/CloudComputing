import { NextFunction, Request, Response } from 'express'
import { Prisma, PrismaClient } from '@prisma/client'
import { decrypt, getId } from './auth'
import multer from 'multer'
import * as fs from 'fs'

import path from 'path'
import { getUserDetailValidator } from '../middleware/validator/userValidator'
import { runInNewContext } from 'vm'
const prisma = new PrismaClient()

// Profile Photo Storage 
const profileStorage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, './storage/profile-picture')
    },
    filename : async (req, file, cb) => {
        const token = req.headers['auth'] as string
        const userId = getId(token)
        const userDetail = await prisma.userDetails.findFirst({
            where : { userId : userId }
        })
        const splitting = file.originalname.split('.')
        const length = splitting.length
        console.log()
        cb(null, userId + '_' + userDetail?.tempatLahir + '.' + splitting[length-1])
    }
})

export const profileUploader = multer({
    storage : profileStorage,
    limits : {
        fileSize : 10000
    }
})

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
            message : `${user.email} telah berhasil dibuat. Silahkan Login untuk mendapatkan Token.`
        })
    })
}

// Read Detail Profile 
export const userDetail = async (req: Request, res: Response) => {
    const data = req.body
    const token = req.headers['auth'] as string
    const userId = getId(token)
    const option = {
        root : path.join(__dirname)
    }

    await prisma.userDetails.findUnique({
        where: {
            userId : userId as number
        }
    })
    .then(user => {
        if (user === undefined) {
            res.status(404).send ({ error : 'Not Found!'})
            return
        }
        // if(user?.profilePicture) {
        //     res.sendFile(user.profilePicture, option)
        // }
        res.send({ userDetail : user })
    })
}

export const getProfilePicture = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['auth'] as string
    const userId = getId(token)
    var option = {
        root : path.join(__dirname)
    }
    const userDetails = await prisma.userDetails.findUnique ({
        where : {userId : userId}
    })

    if (userDetails?.profilePicture) {
        console.log('kirim pap dulu')
        res.sendFile(userDetails.profilePicture, option)
        return next()
    }
    else {
        console.log('ga ada pap nich')
        return next()
    } 

}


// Update User Details
export const updateUserDetail = async (req : Request, res : Response) => {
    const data = req.body 
    const token = req.headers['auth'] as string
    const userId = getId(token)

    await prisma.userDetails.update({
        where : {
            userId : userId as number
        },
        data : {
            jenisKelamin : data?.jenisKelamin,
            namaLengkap : data?.namaLengkap,
            tanggalLahir : data?.tanggalLahir as Date,
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

// Upload Profile Picture 
export const uploadPP = async (req: Request, res: Response) => {
    const path = req.file?.path
    const token = req.headers['auth'] as string
    const userId = getId(token)

    // Cek Profile nya ada engga 
    const userDetail = await prisma.userDetails.findUnique({
        where : { userId : userId }
    })

    if (userDetail?.profilePicture) {
        // console .log('ada data lama')
        fs.unlinkSync('./' + userDetail?.profilePicture)
    }

    await prisma.userDetails.update({
        where : { userId :userId},
        data : {
            profilePicture : path
        }
    }).then (getUserDetail => {
        res.send({ message : 'Upload Foto Profil Berhasil!'}) 
    })
}