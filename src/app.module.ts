import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
// import {ConfigModule,ConfigService} from '@nestjs/'
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageModule } from './storage/storage.module';
import { LoggerMiddleware } from './common/middleware/log.middleware';
import { UsersController } from './users/users.controller';
import helmet from 'helmet';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { KeysModule } from './keys/keys.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
        // entities: ['disk/users/user.entity.js'],
        migrations: ['disk/db/migrations/*.js'],
        synchronize: true,
        logging: ['query', 'error'],
      }),
    }),
    JwtModule.register({
      global: true,
      // secret: jwtConstants.secret,
      // signOptions: { expiresIn: '120s' },
    }),

    UsersModule,
    StorageModule,
    AuthModule,
    KeysModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(helmet(), new LoggerMiddleware().use)
      .exclude(
        // { path: '/users/create', methodnpm: RequestMethod.POST },
        { path: '/users/:id/:postId', method: RequestMethod.GET },
      )
      .forRoutes(UsersController);
  }
}
