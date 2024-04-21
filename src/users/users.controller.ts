import {
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

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

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
  @UseInterceptors(FileInterceptor('avt'))
  async uploadAvt(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
    console.log('upload avatar::', file);
  }
}
