import { Injectable } from '@nestjs/common';
import { SaveKey } from './dto/save-key.dto';
import { Keys } from './key.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class KeysService {

    constructor(@InjectRepository(Keys)private keyRepository:Repository<Keys>){}

    async saveKey(saveKey: SaveKey) {
        const key: Keys = new Keys()
        Object.assign(key, saveKey)
        console.log("::key Keys service::",key);
        
        const newKey = await this.keyRepository.save(key);
        return newKey;
    }
    
}
