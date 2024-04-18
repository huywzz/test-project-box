import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDTO } from './dto/create-dto.user';
import { UserStore } from './dto/data.user';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { IsExist } from 'src/exceptions';
import * as bcrypt from 'bcrypt';
import { UpdateUser } from './dto/update-dto.user';

@Injectable()
export class UsersService {
   
    constructor(@InjectRepository(User) private userRepository:Repository<User>){}

    async findOneByUserName(username: string){
        return await this.userRepository.findOneBy({username})
    }
    async getOne(option: FindOneOptions<User>) {
        return await this.userRepository.findOne(option)
    }
    async checkUsernameExist(username: string,userId?:number) {
        const user = !userId
            ? await this.getOne({
                where: {
                        username:username,
                    }
            })
            : await this.getOne({
                where: {
                    username: username,
                    id:userId
                }
            })
        if (user) {
            throw new BadRequestException('user exist')
        }
    }
    async createUser(user:UserDTO){
        await this.checkUsernameExist(user.username)
        const saltOrRounds = 10;
        const password = user.password 
        user.password = await bcrypt.hash(password, saltOrRounds);
        const userSave = new User();
        Object.assign(userSave, user)
        const newUser = await this.userRepository.save(userSave);
        return newUser;
    }
    async getAllUser() {
        return await this.userRepository.find({})
    }
    async updateProfileUser(dto: UpdateUser, user: User) {
        await this.checkUsernameExist(dto.username)
        Object.assign(user, dto)
        const userUpdate = await this.userRepository.save(user)
        return userUpdate
    }
   
    
}
