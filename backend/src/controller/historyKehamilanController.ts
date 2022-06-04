import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { getId } from "./authController";
import { userDetail } from "./userController";
import exp from "constants";

const prisma = new PrismaClient()

// Create Kehamilan 
export const createKehamilan = async (req: Request, res: Response) => {
    const data = req.body as Prisma.HistoryKehamilanCreateInput 
    const token = req.headers['auth'] as string 
    const userId = getId(token)
    prisma.userDetails.update({
        where : {
            userId : userId
        },
        include : {
            historyKehamilan: true
        },
        data : {
            historyKehamilan : {
                create : {
                    lahir : false,
                    tanggalHamil : data.tanggalHamil,
                    tanggalKelahiran : data.tanggalKelahiran,
                }
            }
        }
    })
    .then(userDetail => {
        res.send({
            message : `Data Kehamilan telah berhasil di Input!`
        })
    })
    .catch(err => {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code == 'P2015') {
                res.status(404).send({ message : 'Not Found!'})
            }
        }
    })
}

// Update Kehamilan by Id 
export const updateKehamilanById = (req : Request, res: Response) => {
    const kehamilanId = parseInt(req.params.kehamilanId)
    const data = req.body 
    prisma.historyKehamilan.update({
        where : {
            id : kehamilanId
        },
        data : {
            lahir : data?.lahir,
            tanggalHamil : new Date(data?.tanggalHamil),
            tanggalKelahiran : new Date(data?.tanggalKelahiran),
        }
    })
    .then(historyKehamilan => {
        res.send({ message : 'Data telah berhasil di update'})
    })
    .catch( err => {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code == 'P2015') {
                res.status(404).send({ message : 'Not Found!'})
            }
        }
    })
}

// Real All History Kehamilan
export const getAllHistoryKehamilan = (req:Request, res:Response) => {
    const token = req.headers['auth'] as string
    const userId = getId(token)
    prisma.historyKehamilan.findMany({
        where : {
            userDetailsId : userId
        }
    })
    .then( data => {
        if (!data) {
            res.status(404).send({ message : 'Tidak ada data yang tersimpan sihlakn input data terlebih dahulu'})
            return
        }
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

// Read History kehamilan by Id 
export const getHistoryKehamilanById = (req: Request, res:Response) => {
    const kehamilanId = parseInt(req.params.kehamilanId)
    prisma.historyKehamilan.findUnique({
        where:{
            id:kehamilanId
        }
    })
    .then(data => {
        if (!data) {
            res.status(404).send({ message: `History Kehamilan dengan id ${kehamilanId} tidak ditemukan`})
            return
        }
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

// Delete History Kehamilan by Id 
export const deleteHistoryKehamilanById = (req:Request, res:Response) => {
    const kehamilanId = parseInt(req.params.kehamilanId)
    prisma.historyKehamilan.delete({
        where : {
            id : kehamilanId
        }
    })
    .then(data => {
        res.send({ message : `Data kehamilah dengan id ${kehamilanId} telah dihapus.`})
    })
    .catch(err => {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code == 'P2015') {
                res.status(404).send({ message : 'Not Found!'})
            }
        }
    })
}

