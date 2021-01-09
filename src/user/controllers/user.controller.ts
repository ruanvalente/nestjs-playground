import { UserDTO } from './../dto/user';
import { Controller, Get, Post } from '@nestjs/common';

import { UserService } from '../services/user.service';

@Controller('v1/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(): Array<UserDTO> {
    return this.userService.findAll();
  }
}
