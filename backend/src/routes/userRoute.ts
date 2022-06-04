import { Router } from "express";
import { changePassword } from "../controller/authController";
import { getProfilePicture, profileUploader, register, updateUserDetail, uploadPP, userDetail } from "../controller/userController";
import { checkToken } from "../middleware/security/checkToken";
import { changePasswordValidator } from "../middleware/validator/loginValidator";
import { getUserDetailValidator, registerValidator, updateUserValidator, uploadPPValidator } from "../middleware/validator/userValidator";

const userRoute = Router()

userRoute
    .route('/register')
        .post(...registerValidator, register)

userRoute
    .route('/')
        .patch(checkToken, ...updateUserValidator, updateUserDetail)
        .get(checkToken, userDetail)

userRoute
    .route('/profile/:userId')
        .get(getProfilePicture)
userRoute 
    .route('/upload')
        .patch(checkToken, profileUploader.single('image'), ...uploadPPValidator,   uploadPP)

userRoute
    .route('/auth')
        .patch(checkToken, ...changePasswordValidator, changePassword)
    
export default userRoute
