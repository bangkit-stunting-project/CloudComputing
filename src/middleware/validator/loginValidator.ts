import {check, checkSchema} from 'express-validator'
import { validator } from './baseValidator'

export const loginValidator = [
    [
        check('email')
            .notEmpty()
            .withMessage('Email tidak boleh kosong')
            .not()
                .custom((val) => /[^A-za-z0-9.@-\s]/g.test(val))
                .withMessage('Terdapat huruf yang dilarang pada Email'),
        check('password')
            .notEmpty()
            .withMessage('Password tidak boleh kosong')
    ],
    validator
]