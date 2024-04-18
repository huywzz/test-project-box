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
import { LoginDTO } from './dto/login-dto';
import * as bcrypt from 'bcrypt';
import { payload } from './interface/payload.interface';

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

    const payload: payload = {
      userId: user.id,
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
        const payload:payload={
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
       console.log('getall::', await this.keyService.getAll());
       
       return {
         userId:id,
         username:username,
         accessToken: accessToken,
         refreshToken: newKey.refreshToken
       }
    }
    
  }
  async login(dto: LoginDTO) {
    //found user
    // check password, compare password
    // if(foundUser) 
    // keyService.findByOption
    // keyService.update isOldRF =true
    const {password,username}=dto
    const foundUser = await this.usersService.findOneByUserName(username)
    if (!foundUser) {
      throw new NotFound('username')
    }
    const match = bcrypt.compare(password, foundUser.password);
    if (!match) {
      throw new NotFound('username password')
    }

    const keyOfUser =await this.keyService.getOneKey({
      where: {
        userId: foundUser.id,
        isOldRF:false
      }
    })
    if (keyOfUser) {
      await this.keyService.updateOneKey(keyOfUser);
      const publicKey = crypto.randomBytes(64).toString('hex');
      const privateKey = crypto.randomBytes(64).toString('hex');

      const { id, username } = foundUser;
      const payload:payload = {
         userId: id,
         username: username,
      };
      const { accessToken, refreshToken } = await this.generateToken(
        payload,
        publicKey,
        privateKey,
      );
      const saveKey = new SaveKey(publicKey, privateKey, refreshToken, id);
      const newKey = await this.keyService.saveKey(saveKey);
      return {
         userId: id,
         username: username,
         accessToken: accessToken,
         refreshToken: newKey.refreshToken,
      };
    }
    return {
      error: new Error('not found key of user')
    }

  }
  
}
