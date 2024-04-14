import { Body, Controller, Get, Param, ParseBoolPipe, Post, Query, Req } from '@nestjs/common';
import { User } from './dto/create-dto.user';
import { UsersService } from './users.service';
import { findOnePost } from './dto/param.dto.user';
import { NotFound } from 'src/exceptions';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/allUser')
  getAllUsers(@Query('isSort', ParseBoolPipe) isSort: boolean) {
    console.log('sortBy:' + isSort);
    return {
      name: 'Huy',
      age: 19,
    };
  }
  @Post('/create')
  createUser(@Body() user: User) {
    // console.log(user);
    this.userService.createUser(user);
    return {
      user,
    };
  }
  @Get(':id/:postId')
  getUserbyId(@Param() param: findOnePost) {
    // console.log(param.id); 
    if (param.id!='1') {
        throw new NotFound('userId')
    }
    return {
      id: param.id,
      postId: param.postId,
    };
  }
}
