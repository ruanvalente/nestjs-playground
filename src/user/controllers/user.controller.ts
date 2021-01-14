import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';

import { UserService } from '../services/user.service';
import { UserDTO } from './../dto/user';

@Controller('v1/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async index(): Promise<UserDTO[]> {
    return await this.userService.index();
  }

  @Post()
  async store(@Body() user: UserDTO): Promise<UserDTO> {
    const createUser = await this.userService.store(user);
    return createUser;
  }

  @Get(':username')
  show(@Param() params: UserDTO) {
    // return this.userService.show(params.username);
  }

  @Put()
  update(@Body() user: UserDTO): void {
    // return this.userService.update(user);
  }

  @HttpCode(204)
  @Delete(':username')
  destroy(@Param() params: UserDTO) {
    // return this.userService.destroy(params);
  }
}
