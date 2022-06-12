import { Router } from "express";
import { getStandardGizi, getStandardGiziByStatus,} from "../controller/standardGiziController";
import { checkToken } from "../middleware/security/checkToken";

const standardGiziRoute = Router()

standardGiziRoute
    .route('/:kelompok')
        .get(checkToken, getStandardGiziByStatus)

standardGiziRoute
    .route('/')
        .get(checkToken, getStandardGizi)


export default standardGiziRoute