import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { getId } from "./auth";

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
}

// Update Kehamilan 

// Real All History Kehamilan

// Read History kehamilan by Id 

