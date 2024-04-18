import { Injectable } from '@nestjs/common';
import { SaveKey } from './dto/save-key.dto';
import { Keys } from './key.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class KeysService {
    constructor(
        @InjectRepository(Keys) private keyRepository: Repository<Keys>,
    ) {}

    async saveKey(saveKey: SaveKey) {
        const key: Keys = new Keys();
        Object.assign(key, saveKey);
        console.log('::key Keys service::', key);

        const newKey = await this.keyRepository.save(key);
        return newKey;
    }
    async getAll() {
        return await this.keyRepository
        .createQueryBuilder('keys')
        .innerJoinAndSelect('keys.user', 'user') // Thực hiện join với entity User
        //   .where('keys.userId = user.id') // Sử dụng user.id trong điều kiện where
        .select(['keys.id', 'user.username'])
        .getRawMany();
    }
    async getOneKey(option: FindOneOptions<Keys>) {
        return await this.keyRepository.findOne(option)
    }
    async updateOneKey(obj: Keys) {
        obj.isOldRF = true
        await this.keyRepository.save(obj) 
    }
}
