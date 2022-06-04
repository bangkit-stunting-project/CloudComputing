import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { getId } from "./authController";

const prisma = new PrismaClient()

// Read Standard givi by Umur 
export const getStandardGiziByBirthDate = (req:Request, res:Response) => {
    const token = req.headers['auth'] as string
    const kelompok = req.params.kelompok
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

        prisma.standarGizi.findFirst({
            where : {
                akhirRentang : { lte : umur},
                awalRentang : { gte : umur},
                kelompok : kelompok,

            },
            include : {
                standarGiziDetail : true
            }
        })
        .then (data => {
            res.send(data)
        })
        .catch (err => {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                if (err.code == 'P2015') {
                    res.status(404).send({ message : 'Not Found!'})
                }
            }
        })
    })
}

// Create Standard Gizi 

// Update Standard Gizi 

// Delete Standard Gizi 

