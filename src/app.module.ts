import { UserService } from './user/services/user.service';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';

import { UserController } from './user/controllers/user.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/ typeorm.config';

@Module({
  imports: [AppModule, TypeOrmModule.forRoot(typeOrmConfig)],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
