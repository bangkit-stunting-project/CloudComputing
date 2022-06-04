import {check} from 'express-validator'
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

export const updateAnakValidator = [
    [
        check('namaLengkap')
        .isAlpha()
        .withMessage('Nama lengkap hanya boleh terdiri dari huruf saja'),
        check('tanggalLahir')
        .isDate()
        .withMessage('Format Tanggal Lahir tidak Valid.'),
        check('tempatLahir')
        .isAlpha()
        .withMessage('Tempat Lahir hanya boleh terdiri dari huruf saja')
    ],
    validator
]

