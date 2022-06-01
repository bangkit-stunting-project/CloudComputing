import { Request, Response } from 'express'
import { Prisma, PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { getId } from './auth'

const prisma = new PrismaClient()

// Create Anak 
export const createAnak = (req : Request, res: Response) => {
    const token = req.headers['auth'] as string
    const userId = getId(token)
    const data = req.body as Prisma.AnakCreateInput

    prisma.userDetails.update({
        where : {
            userId : userId as number
        },
        data : {
            daftarAnak : {
                create : {
                    namaLengkap : data.namaLengkap,
                    tanggalLahir : new Date(data.tanggalLahir),
                    tempatLahir : data.tempatLahir
                }
            }
        }
    })
    .then(userDetail => {
        res.send({ message : `${data.namaLengkap} telah berhasil di input`})
    })
    .catch(error => {
        res.send({ error : error })
        if (error instanceof PrismaClientKnownRequestError){
        }
    })
}
// Update Anak 
export const updateAnak = async (req : Request, res : Response ) => {
    const token = req.headers['auth'] as string 
    const userId = getId(token)
    const anakId = req.params['id'] as any as number
    const data = req.body as Prisma.AnakUpdateInput

    await prisma.anak.update({
        where : { 
            id : anakId,
        },
        data : {
            namaLengkap : data?.namaLengkap,
            tanggalLahir : data?.tanggalLahir as Date,
            tempatLahir : data?.tempatLahir
        }
    })
    .then (anak => {
        res.status(500).send({ message : `${anak.namaLengkap} telah berhasil di update`})
    })
    .catch ( err => {
        res.send({ error : err})
    })
}

// Delete Anak 

// Read Daftar Anak All 
export const getListAnak = (req : Request, res : Response) => {
    const token = req.headers['auth'] as string || req.headers.authorization as string
    const userId = getId(token)

    prisma.userDetails.findUnique({
        where :{
            userId : userId 
        },
        include : {
            daftarAnak : true
        }
    })
    .then(userDetail => {
        if (!userDetail?.daftarAnak) {
            res.send( { message : 'Wah kamu masih belum punya anak nih ayo input data anak atau bikin anak dulu'})
        }
        res.send(userDetail?.daftarAnak)
    })
}

// Read Daftar Anak by Anak Id 