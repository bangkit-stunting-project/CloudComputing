import { Router } from "express";
import { getStandardGiziByBirthDate } from "../controller/standardGiziController";
import { checkToken } from "../middleware/security/checkToken";

const standardGiziRoute = Router()

standardGiziRoute
    .route('/:kelompok')
        .get(checkToken, getStandardGiziByBirthDate)



export default standardGiziRoute