import { Request, Response, Router } from "express";
import { decodeToken, testUploadImage, uploader } from "../controller/testing";
import anakRouter from "./anak";
import loginRoute from "./login";
import userRoute from "./user";

const router = Router()

router.use('/login', loginRoute)
router.use('/user', userRoute)
router.use('/anak', anakRouter)

router
    .get('/testing', decodeToken)
    .post('/testing', uploader.array("files"), testUploadImage)

router
    .get('/', (req: Request, res: Response) : void => {
        res.send(
            {
                message: "Welcome to Stunting Project Entry Point!"
            }
        )
    })
    



export default router