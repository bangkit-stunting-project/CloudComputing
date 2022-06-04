import { Request, Response, Router } from "express";
import { decodeToken, testUploadImage, uploader } from "../controller/testingController";
import anakRouter from "./anakRoute";
import historyRoute from "./historyRoute";
import loginRoute from "./loginRoute";
import standardGiziRoute from "./standardGiziRouter";
import userRoute from "./userRoute";

const router = Router()

router.use('/login', loginRoute)
router.use('/user', userRoute)
router.use('/anak', anakRouter)
router.use('/history', historyRoute)
router.use('/standard-gizi', standardGiziRoute)

router
    .get('/testing', decodeToken)
    .post('/testing', uploader.single("files"), testUploadImage)

router
    .get('/', (req: Request, res: Response) : void => {
        res.send(
            {
                message: "Welcome to Stunting Project Entry Point!"
            }
        )
    })
    



export default router