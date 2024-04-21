import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { KeysModule } from 'src/keys/keys.module';
import { AuthGuard } from './guard/auth.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, KeysModule, ConfigModule],
  controllers: [AuthController],
  providers: [AuthService],
  // exports: [AuthService],
})
export class AuthModule {}
