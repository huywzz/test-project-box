import { Module } from '@nestjs/common';
import { KeysService } from './keys.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Keys } from './key.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Keys])],
  providers: [KeysService],
  exports:[KeysService]
})
export class KeysModule {}
