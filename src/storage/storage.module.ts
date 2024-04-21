import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';

@Module({
  imports:[TypeOrmModule.forFeature([File])],
  providers: [StorageService],
  exports:[StorageService]
})
export class StorageModule {}
