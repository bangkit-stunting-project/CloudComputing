import { Request, Response } from 'express'
import { PrismaClient, Prisma } from '@prisma/client'
import moment from 'moment';

const prisma = new PrismaClient();

// Create Stunting Data Manual 
export const createHistoryStunting = (req:Request, res:Response) => {
    let tinggiBadan = req.body.tinggiBadan
    const isTerlentang = req.body.isTerlentang 
    const anakId = req.params.anakId
    prisma.anak.findUnique({
        where : {
            id : parseInt(anakId)
        }
    })
    .then(async anak => {
        const tanggalLahir = anak?.tanggalLahir as Date
        const umurBulan = moment().diff(tanggalLahir, 'months')
        // console.log(umurBulan)
        // console.log(typeof(isTerlentang))
        if (umurBulan < 24 && isTerlentang == 'false') {
            tinggiBadan = parseFloat(tinggiBadan) + 0.7
            // console.log(tinggiBadan)
        }
        if (umurBulan > 23 && isTerlentang == 'true') {
            tinggiBadan = parseFloat(tinggiBadan) - 0.7
            // console.log(tinggiBadan)
        }
        prisma.standardStunting.findFirst({
            where : {
                gender : anak?.jenisKelamin,
                umur : umurBulan
            }
        })
        .then(standarStunting => {
            const sdminus2 = standarStunting?.SDMinus2 || 0
            const sdminus3 = standarStunting?.SDMinus3 || 0
            const sdplus3 = standarStunting?.SDPlus3 || 0
            let status = ''
            if (sdminus2 == 0 || sdminus3 == 0 || sdplus3 == 0) {
                res.status(404).send({ message : 'Wah ga ada data stuting nya nih'})
                return
            }
            if (tinggiBadan < sdminus3 ) {
                status = 'Severely Stunted'
                // res.send({ message : `Beuh ini anak anda udah ga layak hidup, mending mati deh`})
            }
            if (tinggiBadan  < sdminus2  && tinggiBadan >= sdminus3) {
                status = 'Stunted'
                // res.send({ message : 'Wah anak anda stunting bu ga pantas hidup nih'})
            }
            if (tinggiBadan <= sdplus3 && tinggiBadan >=sdminus2) {
                status = 'Normal'
            }
            if (tinggiBadan > sdplus3 ) {
                status = 'Tinggi'
            }
            prisma.historyStunting.create({
                data : {
                    result : status,
                    timestamp : new Date(),
                    tinggiBadan : parseFloat(tinggiBadan),
                    anak : {
                        connect : {
                            id : anak?.id
                        }
                    }
                }
            })
            .then(historyStunting => {
                res.send({ message : `${anak?.namaLengkap} telah berhasil dicatat`,
                            details : historyStunting
                        })
            })
        })
        .catch (err => {
            console.log(err)
        })
        // console.log(standar)
    })

}

// Create Stunting Data with OpenCVJS

// Delete History Stunting by Id 
export const deleteHistoryStuningById = (req:Request, res:Response) => {
    const stuntingHistoryId = parseInt(req.params.stuntingId) 
    prisma.historyStunting.delete({
        where : {
            id : stuntingHistoryId
        }
    })
    .then(data => {
        res.send ({ message :`History Stunting dengan id ${stuntingHistoryId} telah berhasil dihapus`})
    })
    .catch (err => {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code == 'P2015') {
                res.status(404).send({ message : 'Not Found!'})
            }
        }
    })
}

// Read History Stunting All by AnakId 
export const getAllHistoryStuntingByAnakId = (req:Request, res:Response) => {
    const anakId = parseInt(req.params.anakId)
    prisma.historyStunting.findMany({
        where : {
            anakId : anakId
        }
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code == 'P2015') {
                res.status(404).send({ message : 'Not Found!'})
            }
        }
    })
}

// Read History Stunting by Date 
export const getStuntingHistoryByDate = (req:Request, res:Response) => {
    const date = new Date(req.params.date) 
}

