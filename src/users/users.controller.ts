import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpException,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseBoolPipe,
  ParseFilePipe,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserDTO } from './dto/create-dto.user';
import { UsersService } from './users.service';
import { findOnePost } from './dto/param.dto.user';
import { NotFound } from 'src/exceptions';
import { plainToClass } from 'class-transformer';
import { ApiResponse } from '@nestjs/swagger';
import { CREATED, SuccessResponse } from 'src/shares';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { configStorage } from 'helper/config.upload';
import { StorageFileDTO } from 'src/storage/dto/storage-file.dto';
import { FileService } from 'src/file/file.service';
import { StorageService } from 'src/storage/storage.service';
import { error, log } from 'console';
import { extname } from 'path';
import { allowType, fileSize } from './constants';
import { FileValidationInterceptor } from './interceptor';
import { imageOptions } from './util/image-multer-options';


@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly storageService: StorageService,
  ) {}

  @Post('')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  async createUser(@Body() userDTO: UserDTO) {
    const userObj = plainToClass(UserDTO, userDTO, {
      excludeExtraneousValues: true,
    });
    return {
      message: 'created ss',
      statusCode: HttpStatus.CREATED,
      metadata: await this.userService.createUser(userObj),
    };
  }

  @Get('/getall')
  async getAllUser() {
    return {
      message: 'get all ss',
      statusCode: HttpStatus.OK,
      metadata: await this.userService.getAllUser(),
    };
  }
  @Get('/getkeybyuser/:id')
  async getKeyByUser(@Param('id') id: string) {
    const convert = parseInt(id);
    return {
      message: 'get all ss',
      statusCode: HttpStatus.OK,
      metadata: await this.userService.getKeyByUser(convert),
    };
  }
  @Post('upload-avt')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('avt',imageOptions),
  )
  async uploadAvt(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
    console.log('upload avatar::', file);
    console.log('userId::', req.user);
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    const dto = new StorageFileDTO(req.user.userId, file.path);
    return {
      message: 'upload ss',
      statusCode: 200,
      metadata: await this.storageService.storageFile(dto),
    };
  }
  //up load hàng loạt
  @Post('upload-bulk')
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('images', 6, imageOptions))
  async uploadBulk(
    @Req() req: any,
    @UploadedFiles()
    images: Array<Express.Multer.File>,
  ) {
    const arrStorageFile: StorageFileDTO[] = new Array<StorageFileDTO>;
    images.forEach((image) => {
      arrStorageFile.push(new StorageFileDTO(req.user.userId,image.path));
    })
    console.log('::arrStorageFile::', arrStorageFile);
    
    console.log('::images User', images);
     return {
       message: 'upload ss',
       statusCode: 200,
       metadata: await this.storageService.bulkStorageFile(arrStorageFile),
     };
  }
}
