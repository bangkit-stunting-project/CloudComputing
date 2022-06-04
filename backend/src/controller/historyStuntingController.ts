import { Request, Response } from 'express'
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient();

// Create Stunting Data Manual 

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

