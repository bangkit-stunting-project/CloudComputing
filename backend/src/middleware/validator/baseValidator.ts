import {Request, Response, NextFunction} from 'express'
import { body, validationResult } from 'express-validator'

export const validator = (req : Request, res : Response, next: NextFunction) => {
    const error = validationResult (req)
    if (!error.isEmpty()) {
        res.status(400).send({
            success : false,
            inputError : error.array().map(validationError => validationError.msg)
        })
        return
    }
    else next()
}
