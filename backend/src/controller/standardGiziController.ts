import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { getId } from "./authController";
import { resolveSoa } from "dns";

const prisma = new PrismaClient()

// Read Standard givi by Umur 
export const getStandardGizi = (req:Request, res:Response) => {
    const token = req.headers['auth'] as string
    const userId = getId(token)
    prisma.userDetails.findUnique({
        where : {
            userId: userId
        }
    })
    .then(userDetails => {
        const tanggalLahir = userDetails?.tanggalLahir
        const tahunLahir = tanggalLahir?.getFullYear() as number
        const tanggalNow = new Date
        const tahunNow = tanggalNow.getFullYear()
        const umur = tahunNow - tahunLahir
        console.log(tahunLahir + '-' + tahunNow)
        console.log(umur)
        const gender = userDetails?.jenisKelamin
        let kelompok 
        if (gender == 'M' ) {
            kelompok = 'Laki-Laki'
        }
        else if (gender == 'F') {
            kelompok = 'Perempuan'
        }

        prisma.standarGizi.findFirst({
            where : {
                akhirRentang : { gte : umur},
                awalRentang : { lte : umur},
                kelompok : kelompok,

            },
            include : {
                standarGiziDetail : true
            }
        })
        .then (data => {
            console.log(data)
            res.send(data)
        })
        .catch (err => {
            console.log(err)
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                if (err.code == 'P2015') {
                    res.status(404).send({ message : 'Not Found!'})
                }
            }
        })
    })
}

// Get Standard Gizi by Status 
export const getStandardGiziByStatus = (req:Request, res:Response) => {
    // const token = req.headers['auth'] as string
    // const userId = getId(token)

    prisma.standarGizi.findFirst ({
        where : {
            trimester : req.body.trimester,
            kelompok : req.params.kelompok
        },
        include : {
            standarGiziDetail :true
        }
    })
    .then(data => {
        console.log(data)
        res.send(data)
    })
    .catch ( err => {
        console.log(err)
    })

}

// Create Standard Gizi 

// Update Standard Gizi 

// Delete Standard Gizi 

