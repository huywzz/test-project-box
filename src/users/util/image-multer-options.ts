import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { fileSize } from "../constants";
import { configStorage } from "helper/config.upload";
import { HttpException, HttpStatus } from "@nestjs/common";

const imageFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error, acceptFile: boolean) => void,
) => {
 if (!Boolean(file.mimetype.match(/(jpg|jpeg|png|gif)/))) {
   callback(new HttpException('Invalid files', HttpStatus.BAD_REQUEST), false);
 } else {
   callback(null, true);
 }
};

export const imageOptions: MulterOptions = {
  limits: { fileSize: fileSize },
  fileFilter: imageFilter,
  storage: configStorage('user')    
};
