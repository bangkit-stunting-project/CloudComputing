import { Request, Response } from 'express'
import { Prisma, PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { getId } from './auth'
import { connect } from 'http2'

const prisma = new PrismaClient()

// Create Anak 
export const createAnak = (req : Request, res: Response) => {
    const token = req.headers['auth'] as string
    const userId = getId(token)
    const data = req.body as Prisma.AnakCreateInput

    prisma.user.findUnique({
        where : { id : userId}
    })
    .then( parent => {
        prisma.anak.create({
            select : {
                
            }
            data :{
                namaLengkap : data.namaLengkap,
                tanggalLahir : new Date (data.tanggalLahir),
                tempatLahir : data.tempatLahir,
                parent :
            }
        })
    })
}
// Update Anak 

// Delete Anak 

// Read Daftar Anak All 

// Read Daftar Anak by Anak Id 