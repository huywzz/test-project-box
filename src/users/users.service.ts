import { Injectable } from '@nestjs/common';
import { User } from './dto/create-dto.user';

@Injectable()
export class UsersService {
    data: Array<User> = new Array<User>;
    createUser(user:User): void{
        this.data.push(user);
    }
}
