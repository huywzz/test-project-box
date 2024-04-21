import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { KeysModule } from 'src/keys/keys.module';
import { FileModule } from 'src/file/file.module';
import { StorageModule } from 'src/storage/storage.module';


@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule, KeysModule,StorageModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
