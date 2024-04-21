import { Injectable } from '@nestjs/common';
import { StorageFileDTO } from './dto/storage-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';

@Injectable()
export class StorageService {

    constructor(@InjectRepository(File) private fileRepository: Repository<File>) { }
    
    async storageFile(storageFile:StorageFileDTO){
        const entity = new File()
        Object.assign(entity, storageFile)
        const newRecord = await this.fileRepository.save(entity)
        return newRecord
    }

}
