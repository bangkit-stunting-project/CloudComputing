import { Router } from "express";
import { changePassword } from "../controller/auth";
import { register, updateUserDetail, userDetail } from "../controller/user";
import { checkToken } from "../middleware/security/checkToken";
import { changePasswordValidator } from "../middleware/validator/loginValidator";
import { getUserDetailValidator, registerValidator, updateUserValidator } from "../middleware/validator/userValidator";

const userRoute = Router()

userRoute
    .route('/register')
        .post(...registerValidator, register)

userRoute
    .route('/')
        .patch(checkToken, ...updateUserValidator, updateUserDetail)
        .get(checkToken, userDetail)

userRoute
    .route('/auth')
        .patch(checkToken, ...changePasswordValidator, changePassword)
    
export default userRoute
