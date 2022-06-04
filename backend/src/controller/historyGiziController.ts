import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { getId } from "./authController";
import { userDetail } from "./userController";

const prisma = new PrismaClient()

// Read History Gizi All
export const getHistoryGiziAll = (req : Request, res : Response) => {
    const token = req.headers['auth'] as string
    const userId = getId(token)

    prisma.userDetails.findUnique({
        where : {
            userId : userId
        },
        include : {
            historyGizi : true
        }
    }).then (userDetail => {
        res.send ({ historyGizi : userDetail?.historyGizi })
    })
    .catch (err => {
        console.log(err)
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code == 'P2015') {
                res.status(404).send({ message : 'Not Found!'})
            }
        }
    })
}

// Read History Gizi by Date 
export const getHistoryGizibyDate = (req:Request, res:Response) => {
    const token = req.headers['auth'] as string
    const userId = getId(token)
    
    prisma.historyGizi.findMany({
        where : {
            ibuId : userId,
            timestamp : new Date(req.params.date)
        }
    })
    .then(history => {
        res.send(history)
    })
    .catch(err => {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code == 'P2015') {
                res.status(404).send({ message : 'Not Found!'})
            }
        }
    })
}

// Delete History Gizi by Id 
export const deleteHistoryGiziById = (req: Request, res: Response) => {
    const historyId = parseInt(req.params.historyId)

    prisma.historyGizi.delete({
        where: {
            id : historyId
        }
    }).then(history => {
        res.send({
            message : 'Data Berhasil Dihapus'
        })
    })
    .catch(err => {
        console.log(err)
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code == 'P2015') {
                res.status(404).send({ message : 'Not Found!'})
            }
        }
    })

}

// Read History Gizi By Id 
export const getHistoryGiziById = (req:Request, res:Response) => {
    const giziId = parseInt(req.params.giziId)
    prisma.historyGizi.findUnique({
        where : {
            id : giziId
        }
    })
    .then(data => {
        res.send(data)
    })
    .catch (err => {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code == 'P2015') {
                res.status(404).send({ message : 'Not Found!'})
            }
        }
    })
}

// Input History Gizi using TF Model