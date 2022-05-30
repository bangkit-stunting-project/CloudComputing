import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import multer from 'multer';
import path from 'path';

export const uploadStorage = multer.diskStorage({
    destination : (req:Request, file, cb) => {
        cb(null, './storage/testing')
    },
    filename : (req :Request, file , cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})

export const uploader = multer({
    storage : uploadStorage,
    limits : {
        fileSize : 100000
    },
    fileFilter(req : Request, file, cb) {
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return cb(new Error('Invalid File Type'))
        }
        cb(null, true)
    }
})


interface TOKENData {
    id : Number;
    email : String
}

export const decodeToken = ( req: Request, res:Response) => {
    const token = req.headers['auth'] as string || req.headers.authorization as string
    const decoded = jwt.decode(token, {complete : true})?.payload
    res.send({ message : (decoded as TOKENData).id })
}

export const testUploadImage = (req: Request, res: Response) => {
    console.log(req)
    res.send(req.body)
    // res.send({ message : 'Upload File Sukses'})
}