import { diskStorage } from "multer";


export const configStorage = (folder: string) => diskStorage({
    destination: `upload/${folder}`,
    filename(req, file, callback) {
        callback(null,Date.now()+'-'+file.originalname)
    },
})