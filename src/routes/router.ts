import { Request, Response, Router } from "express";
import loginRoute from "./login";
import userRoute from "./user";

const router = Router()

router.use('/login', loginRoute)
router.use('/user', userRoute)

router
    .get('/', (req: Request, res: Response) : void => {
        res.send(
            {
                message: "Welcome to Stunting Project Entry Point!"
            }
        )
    })



export default router