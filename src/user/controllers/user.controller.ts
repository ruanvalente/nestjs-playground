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

  @Get(':id')
  async show(@Param() userRequest: UserDTO): Promise<UserDTO> {
    return await this.userService.show(userRequest.id);
  }

  @Put(':id')
  async update(@Param() id, @Body() userRequest: UserDTO): Promise<UserDTO> {
    return await this.userService.updated(id, userRequest);
  }

  @HttpCode(204)
  @Delete(':id')
  async destroy(@Param() userRequest: UserDTO): Promise<void> {
    await this.userService.destroy(userRequest.id);
  }
}
