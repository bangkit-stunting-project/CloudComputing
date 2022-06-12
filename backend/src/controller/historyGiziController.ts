import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { getId } from "./authController";
import * as tf from '@tensorflow/tfjs-node'
import * as fs from 'fs'
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
export const createHistoryGizi = async (req:Request, res:Response) => {
    const path = req.file?.path
    var option = {
        root : './'
    }

    const model = await tf.loadLayersModel('file://src/model/Vall_Loss_Best_Model_11_Class/model.json')
    const label = ['Bebek Goreng', 'Beef Burger', 'Cumi Cumi Goreng', 'Gulai Kambing', 'Mie Ayam', 'Rendang Sapi', 'Sayur Asem', 'Semur Jengkol', 'Sop Buntut', 'Soto Padang', 'Tekwan']

    // Pre processing 
    const image = fs.readFileSync(`./${path}`)
    const decoded = tf.node.decodeImage(image)
    const resized = tf.image.resizeBilinear(decoded, [300, 300]).div(tf.scalar(255))
    const expanded = tf.expandDims(resized, 0)

    // Prediction 
    const result = model.predict(expanded) as tf.Tensor
    const labelIdx = tf.argMax(result.dataSync())
    const classLabel = label[labelIdx.dataSync()[0]]

    prisma.giziMakanan.findFirst({
        where : {
            namaMakanan : classLabel
        }
    }).then(giziMakanan => {
        res.send({ class : classLabel, detail : giziMakanan})
    }).catch(err => {
        console.log(err)
    })
}