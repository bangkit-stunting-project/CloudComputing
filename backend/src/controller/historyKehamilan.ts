import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { getId } from "./auth";

const prisma = new PrismaClient()

// Create Kehamilan 
export const createKehamilan = async (req: Request, res: Response) => {
    const data = req.body as Prisma.HistoryKehamilanCreateInput 
    const token = req.headers['auth'] as string 
    const userId = getId(token)
    const userDetail = await prisma.userDetails.findUnique({
        where : {
            userId : userId
        }
    })
    prisma.historyKehamilan.create({
        data :{
            lahir : false,
            tanggalHamil : data.tanggalHamil,
            tanggalKelahiran : data.tanggalKelahiran,
            userDetailsId : userDetail?.id,
            userDetails : {
                connect : {
                    userId : userId
                }
            }
    
        }
    })
}

// Update Kehamilan 

// Real All History Kehamilan

// Read History kehamilan by Id 

