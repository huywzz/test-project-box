import { Injectable } from '@nestjs/common';
import { UserDTO } from './dto/create-dto.user';
import { UserStore } from './dto/data.user';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { IsExist } from 'src/exceptions';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
   
    constructor(@InjectRepository(User) private userRepository:Repository<User>){}

    async findOneByUserName(username: string){
        return await this.userRepository.findOneBy({username})
    }
    async createUser(user:UserDTO){
        const username = await this.findOneByUserName(user.username)
        console.log(username);
        
        if (username) {
            throw new IsExist('username')
        }
        const saltOrRounds = 10;
        const password = user.password 
        user.password = await bcrypt.hash(password, saltOrRounds);
        const userSave = new User();
        Object.assign(userSave, user)
        const newUser = await this.userRepository.save(userSave);
        return newUser;
    }
    
}
