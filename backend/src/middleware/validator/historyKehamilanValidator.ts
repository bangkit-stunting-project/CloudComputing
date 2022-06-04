import { check } from "express-validator";
import { validator } from "./baseValidator";

export const createKehamilanValidator = [
    [
        check('lahir')
            .isBoolean()
            .withMessage('Status Kelahiran harus Boolean')
            .notEmpty()
            .withMessage('Status Kelahiran tidak boleh Kosong!'),
        check('tanggalHamil')
            .isDate()
            .withMessage('Format Tanggal tidak Valid mohon Input Ulang')
            .notEmpty()
            .withMessage('Tanggal Kehamilan tidak boleh konsong'),
        check('tanggalKelahiran')
            .isDate()
            .withMessage('Format Tanggal Kelahiran tidak Valid mohon Input Ulang')
            .optional()
    ],
    validator
]

export const updateKehamilanByIdValidator = [
    [
        check('lahir')
            .isBoolean()
            .withMessage('Status Kelahiran harus Boolean')
            .optional(),
        check('tanggalHamil')
            .isDate()
            .withMessage('Format Tanggal tidak Valid mohon Input Ulang')
            .optional(),
        check('tanggalKelahiran')
            .isDate()
            .withMessage('Format Tanggal Kelahiran tidak Valid mohon Input Ulang')
            .optional()
    ],
    validator
]