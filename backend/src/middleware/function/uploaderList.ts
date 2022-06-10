import multer from "multer";
import { historyGiziStorage, profileStorage } from "./storageList";



export const profileUploader = multer({
    storage : profileStorage,
    limits : {
        fileSize : 1000000
    }
})

export const historyGiziUploader = multer({
    storage : historyGiziStorage,
    limits :{
        fileSize : 1000000000
    }
})