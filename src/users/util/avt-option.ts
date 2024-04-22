import { extname } from "path";
import { allowType, fileSize } from "../constants";
import { BadRequestException } from "@nestjs/common";
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { configStorage } from "helper/config.upload";

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error, acceptFile: boolean) => void,
) => {
  const ext = extname(file.originalname);
  if (!allowType.includes(ext)) {
    callback(new BadRequestException('Wrong extension type'), false);
  } else if (file.size > fileSize) {
  
    callback(new BadRequestException('File is too large'), false);
  } else {
    callback(null, true);
  }
};

export const avtOption: MulterOptions = {
    storage: configStorage('user'),
    fileFilter:fileFilter
}