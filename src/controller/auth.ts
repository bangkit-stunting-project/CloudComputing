import * as jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import Bcrypt from 'bcrypt'
import { JWT_KEY, TOKEN_VALID_TIME } from '../constant' 

const prisma = new PrismaClient()

export const login = async (req: Request, res: Response) => {
    let data = req.body 
    // res.send({ data : data})
    prisma.user.findFirst({
        where : { 
            email: data.email
        }
    })
    .then (user => {
        if (user === null) {
            res.status(404).send({
                error : "Username / Password Salah!"
            })
            return
        }
        else {
            Bcrypt.compare(data.password, user.password)
            .then (async isValid => {
                if (isValid) {
                    const token = jwt.sign({id: user?.id, email: user?.email}, JWT_KEY, {
                        expiresIn : TOKEN_VALID_TIME
                    })
                    res.send({
                        token : token
                    })
                }
            })
            .catch (err => {
                console.log(err)
                res.status(500).send({
                    message : "Username / Password Salah!"
                })
                return
            })
        }
    })
    .catch (err => console.log(err))
}