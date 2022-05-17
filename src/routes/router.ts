import { Request, Response, Router } from "express";
import loginRoute from "./login";

const router = Router()

router.use('/login', loginRoute)

router
    .get('/', (req: Request, res: Response) : void => {
        res.send(
            {
                message: "Welcome to Stunting Project Entry Point!"
            }
        )
    })



export default router