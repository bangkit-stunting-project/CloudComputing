import { Request, Response, Router } from "express";
import { decodeToken, testingDetectIsFood, testUploadImage, uploader } from "../controller/testingController";
import { historyGiziUploader } from "../middleware/function/uploaderList";
import anakRouter from "./anakRoute";
import { articleRoute } from "./educationRoute";
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
router.use('/education', articleRoute)

router
    .get('/testing', decodeToken)
    .post('/testing', historyGiziUploader.single('image'), testingDetectIsFood)

router
    .get('/', (req: Request, res: Response) : void => {
        res.send(
            {
                message: "Welcome to Stunting Project Entry Point!"
            }
        )
    })
    



export default router