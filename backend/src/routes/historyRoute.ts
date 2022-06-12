import { Router } from "express";
import { checkSchema } from "express-validator";
import { createHistoryGizi, deleteHistoryGiziById, getHistoryGiziAll, getHistoryGizibyDate, getHistoryGiziById } from "../controller/historyGiziController";
import { createKehamilan, deleteHistoryKehamilanById, getAllHistoryKehamilan, getHistoryKehamilanById, updateKehamilanById } from "../controller/historyKehamilanController";
import { createHistoryStunting, deleteHistoryStuningById, getAllHistoryStuntingByAnakId } from "../controller/historyStuntingController";
import { historyGiziUploader } from "../middleware/function/uploaderList";
import { checkToken } from "../middleware/security/checkToken";
import { FoodValidator } from "../middleware/validator/foodValidator";
import { createKehamilanValidator, updateKehamilanByIdValidator } from "../middleware/validator/historyKehamilanValidator";
import { createHistoryStuntingValidator } from "../middleware/validator/historyStuntingValidator";

const historyRoute = Router()

historyRoute
    .route('/gizi')
        .get(checkToken, getHistoryGiziAll)
        .post(checkToken, historyGiziUploader.single('image'), FoodValidator, createHistoryGizi)

historyRoute
    .route('/gizi/:giziId')
        .get(checkToken, getHistoryGiziById)
        .delete(checkToken, deleteHistoryGiziById)

historyRoute
    .route('/gizi/date/:date')
        .get(checkToken, getHistoryGizibyDate)

historyRoute
    .route('/kehamilan')
        .post(checkToken, ...createKehamilanValidator, createKehamilan)
        .get(checkToken, getAllHistoryKehamilan)

historyRoute
    .route('/kehamilan/:kehamilanId')
        .patch(checkToken, ...updateKehamilanByIdValidator, updateKehamilanById)
        .delete(checkToken, deleteHistoryKehamilanById)

historyRoute
    .route('/stunting/:stuntingId')
        .delete(checkToken, deleteHistoryStuningById)

historyRoute
    .route('/stunting/:anakId')
        .get(checkToken, getAllHistoryStuntingByAnakId)
        .post(checkToken, ...createHistoryStuntingValidator, createHistoryStunting)
        

export default historyRoute