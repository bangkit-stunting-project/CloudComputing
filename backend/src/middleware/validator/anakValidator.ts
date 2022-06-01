import {check} from 'express-validator'
import { chownSync } from 'fs'
import { validator } from './baseValidator'

export const createAnakValidator = [
    [
        check('namaLengkap')
            .notEmpty()
            .withMessage('Nama Anak tidak boleh kosong'),
        check('tanggalLahir')
            .notEmpty()
            .withMessage('Tanggal Lahir tidak boleh kosong')
            .isDate()
            .withMessage('Format Tanggal Lahir tidak valid'),
        check('tempatLahir')
            .notEmpty()
            .withMessage('Tempat Lahir tidak boleh kosong')
    ],
    validator
]