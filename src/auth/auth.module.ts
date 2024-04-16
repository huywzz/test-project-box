import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { KeysModule } from 'src/keys/keys.module';

@Module({
  imports: [UsersModule,KeysModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
