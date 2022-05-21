import {check} from 'express-validator'
import { validator } from './baseValidator'
import { JenisKelamin } from '@prisma/client'

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
            }),
        check('jenisKelamin')
            .notEmpty()
            .withMessage('Jenis Kelamin tidak boleh kosong')
            .isIn(Object.values(JenisKelamin))
            .withMessage('Jenis Kelamin tidak Valid'),
        check('namaLengkap')
            .notEmpty()
            .withMessage('Nama Lengkap tidak boleh kosong')
            .isAlpha()
            .withMessage('Nama Lengkap hanya boleh terdiri dari huruf'),
        check('Tempat Lahir')
            .notEmpty()
            .withMessage('Tempat Lahir tidak boleh kosong'),
        check('Tanggal Lahir')
            .notEmpty()
            .withMessage('Tanggal Lahir tidak boleh kosong')
            .isDate()
            .withMessage('Tanggal Lahir tidak valid silahkan input ulang')
    ],
    validator
]

export const updateUserValidator = [
    [
    check('userId')
        .notEmpty()
        .withMessage('userId tidak boleh kosong')
        .isInt()
        .withMessage('User ID tidak valid silahkxan input ulang'),
    check('jenisKelamin')
        .isIn(Object.values(JenisKelamin))
        .withMessage('Jenis Kelamin tidak Valid'),
    check('namaLengkap')
        .isAlpha()
        .withMessage('Nama Lengkap hanya boleh terdiri dari huruf'),
    check('Tanggal Lahir')
        .isDate()
        .withMessage('Tanggal Lahir tidak valid silahkan input ulang')
    ],
    validator
]

export const getUserDetail = [
    [
        check('userId')
            .notEmpty()
            .withMessage('User ID tidak boleh kosong')
            .isInt()
            .withMessage('User ID tidak valid silahkan input ulang')
    ],
    validator
]