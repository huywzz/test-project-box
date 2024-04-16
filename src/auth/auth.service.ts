import {
  BadRequestException,
  Body,
  Injectable,
  UnauthorizedException,
  Param,
  Request,
  Get,
  UseGuards,
} from '@nestjs/common';
import { SignInDTo } from './dto/signin.dto';
import { UsersService } from '../users/users.service';
import { NotFound } from 'src/exceptions';
import { UserStore } from 'src/users/dto/data.user';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './guard/auth,guard';
import { User } from 'src/users/entities/user.entity';
import { UserDTO } from 'src/users/dto/create-dto.user';
import * as crypto from 'crypto';
import { SaveKey } from 'src/keys/dto/save-key.dto';
import { KeysService } from 'src/keys/keys.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private keyService: KeysService
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    console.log('::username::', username);

    // const user = await this.usersService.findOne(username);
    const user= new User()
    if (!user) {
      throw new NotFound('user');
    }
    if (user.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = {
      useId: user.id,
      username: user.username,
    };

    return {
      accecss_token: await this.jwtService.signAsync(payload,{
        privateKey:'asdsa'
      }),
    };
  }

   async generateToken(payload: any, publicKey: string, privateKey: string){
      const refreshToken = await this.jwtService.signAsync(payload, {
        privateKey: privateKey,
        expiresIn: '7d',
      });
      const accessToken = await this.jwtService.signAsync(payload, {
        privateKey: publicKey,
        expiresIn: '1d',
      });
      return {
        refreshToken: refreshToken,
        accessToken: accessToken,
      };
  }
  async signUp(dto: SignInDTo) {
     const objUser=new UserDTO()
     Object.assign(objUser, dto);
     const newUser = await this.usersService.createUser(objUser);
     if (newUser) {
        const publicKey= crypto.randomBytes(64).toString('hex')
        const privateKey=crypto.randomBytes(64).toString('hex')
        
        const {id,username} = newUser
        const payload={
          userId: id,
          username:username
       }
       const { accessToken, refreshToken } = await this.generateToken(payload, publicKey, privateKey)
       const saveKey = new SaveKey(
         publicKey,
         privateKey,
         refreshToken,
         id,
       );
       
       const newKey = await this.keyService.saveKey(saveKey)
       
       return {
         userId:id,
         username:username,
         accessToken: accessToken,
         refreshToken: newKey.refreshToken
       }
     }
  }
}
