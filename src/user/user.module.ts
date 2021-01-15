import { Module } from '@nestjs/common';

import { UserController } from './controllers/user.controller';

@Module({
  imports: [UserModule],
  controllers: [UserController],
  providers: [],
})
export class UserModule {}
