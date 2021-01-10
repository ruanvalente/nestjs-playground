import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  HttpException,
  HttpStatus,
  Delete,
  HttpCode,
} from '@nestjs/common';

import { UserDTO } from './../dto/user';
import { UserService } from '../services/user.service';

@Controller('v1/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(): Array<UserDTO> {
    return this.userService.findAll();
  }

  @Post()
  store(@Body() user: UserDTO): void {
    return this.userService.store(user);
  }

  @Get(':username')
  show(@Param() params: UserDTO) {
    return this.userService.show(params.username);
  }

  @Put()
  update(@Body() user: UserDTO): void {
    return this.userService.update(user);
  }

  @HttpCode(204)
  @Delete(':username')
  destroy(@Param() params: UserDTO) {
    return this.userService.destroy(params);
  }
}
