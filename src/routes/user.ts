import { Router } from "express";
import { register } from "../controller/user";
import { registerValidator } from "../middleware/validator/userValidator";

const userRoute = Router()

userRoute
    .route('/register')
        .post(...registerValidator, register)

export default userRoute
