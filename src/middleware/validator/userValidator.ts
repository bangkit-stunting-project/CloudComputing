import {check} from 'express-validator'
import { validator } from './baseValidator'

export const registerValidator = [
    [
        check('email')
            .isEmail()
            .withMessage('Email tidak Valid')
            .notEmpty()
            .withMessage('Email tidak boleh kosong'),
        check('password')
            .notEmpty()
            .withMessage('Password tidak boleh kosong')
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
            .withMessage('Password harus memiliki satu huruf kecil, satu huruf besar, angka, dan simbol.'),
        check('confirmPassword')
            .notEmpty()
            .withMessage('Konfirmasi Password tidak boleh kosong')
            .custom(async (confirmPassword, {req}) => {
                const password = req.body.password
                if (password !== confirmPassword) {
                    throw new Error('Konfirmasi Password harus sama!')
                }
            })
    ],
    validator
]