import { UserService } from './user/services/user.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './user/controllers/user.controller';
import { AppService } from './app.service';

@Module({
  imports: [AppModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
