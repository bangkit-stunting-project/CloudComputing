import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
interface TOKENData {
    id : Number;
    email : String
}

export const decodeToken = ( req: Request, res:Response) => {
    const token = req.headers['auth'] as string || req.headers.authorization as string
    const decoded = jwt.decode(token, {complete : true})?.payload
    res.send({ message : (decoded as TOKENData).id })
}