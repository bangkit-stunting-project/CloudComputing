import {check} from 'express-validator'
import { validator } from './baseValidator'

export const loginValidator = [
    [
        check('email')
            .notEmpty()
            .withMessage('Email tidak boleh kosong')
            .isEmail()
            .withMessage('Bener nih Emailnya?'),
        check('password')
            .notEmpty()
            .withMessage('Password tidak boleh kosong')
    ],
    validator
]