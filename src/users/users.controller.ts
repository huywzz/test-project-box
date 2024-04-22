import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UploadedFile,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { configStorage } from 'helper/config.upload';
import { StorageFileDTO } from 'src/storage/dto/storage-file.dto';
import { FileService } from 'src/file/file.service';
import { StorageService } from 'src/storage/storage.service';
import { error } from 'console';
import { extname } from 'path';
import { allowType, fileSize } from './constants';


@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService, private readonly storageService:StorageService) {}

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
  @UseInterceptors(FileInterceptor('avt',
    {
      storage: configStorage('user'),
      fileFilter(req, file, callback) {
        const ext = extname(file.originalname)
        if (!allowType.includes(ext)) {
          req.fileValidationError = 'Wrong extension type';
          callback(null, false);
        } else if (file.size > fileSize) {
          req.fileValidationError = 'File is too large';
          callback(null, false);
        } else {
          callback(null, true)
        }
      },
    }
  ))
  async uploadAvt(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
    console.log('upload avatar::', file);
    console.log('userId::', req.user);
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    const dto= new StorageFileDTO(req.user.userId,file.path)
    return {
      message: 'upload ss',
      statusCode: 200,
      metadata:await this.storageService.storageFile(dto)
    };
  }
}
