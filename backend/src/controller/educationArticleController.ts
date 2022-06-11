import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export const getAllArticle = async (req:Request, res: Response) => {
    console.log('Masek')
    prisma.educationArticle.findMany({})
    .then(allArticle => {
        console.log(allArticle)
        res.send(allArticle)
    })
    // console.log(allArticle)
}