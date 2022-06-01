import { Router } from "express";
import { checkToken } from "../middleware/security/checkToken";
import { createAnakValidator } from "../middleware/validator/anakValidator";
import { createAnak } from "../controller/anak";

const anakRouter = Router()

anakRouter
    .route('/')
        .post(checkToken, ...createAnakValidator, createAnak)

        
export default anakRouter