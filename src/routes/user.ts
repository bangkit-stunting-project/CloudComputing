import { Router } from "express";
import { register, updateUserDetail, userDetail } from "../controller/user";
import { checkToken } from "../middleware/security/checkToken";
import { getUserDetailValidator, registerValidator, updateUserValidator } from "../middleware/validator/userValidator";

const userRoute = Router()

userRoute
    .route('/register')
        .post(...registerValidator, register)

userRoute
    .route('/:userId')
        .patch(checkToken, ...updateUserValidator, updateUserDetail)
        .get(checkToken, ...getUserDetailValidator, userDetail)

export default userRoute
