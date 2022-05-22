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

// Delete Anak 

// Read Daftar Anak All 

// Read Daftar Anak by Anak Id 