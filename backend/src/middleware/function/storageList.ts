import { Prisma, PrismaClient } from "@prisma/client"
import multer from "multer"
import path from "path"
import { getId } from "../../controller/authController"
import {Request, Response } from 'express';

const prisma = new PrismaClient()

export const profileStorage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, path.join(__dirname, './../../storage/profile-picture'))
    },
    filename : async (req, file, cb) => {
        const token = req.headers['auth'] as string
        const userId = getId(token)
        const userDetail = await prisma.userDetails.findFirst({
            where : { userId : userId }
        })
        const splitting = file.originalname.split('.')
        const length = splitting.length
        console.log()
        cb(null, userId + '_' + userDetail?.tempatLahir + '.' + splitting[length-1])
    }
})

export const historyGiziStorage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, './storage/detect-gizi')
    },
    filename : async (req, file, cb) => {
        const token = req.headers['auth'] as string
        const userId = getId(token)
        const userDetail = await prisma.userDetails.findUnique({
            where : { userId :userId}
        })
        const splitting = file.originalname.split('.')
        const length = splitting.length
        cb(null, userId + '_TestingGizi_' + Date.now() + '.' + splitting[length-1])
    }
})
