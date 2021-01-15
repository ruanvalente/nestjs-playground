import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../entity/user.entity';
import { UserDTO } from './../dto/user';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async store(userDTO: UserDTO): Promise<User> {
    if (!userDTO) {
      throw new HttpException(
        'This field cannot be blank',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return await this.userRepository.store(userDTO);
    }
  }

  async index(): Promise<User[]> {
    return await this.userRepository.index();
  }

  async show(id: string): Promise<User> {
    return await this.userRepository.show(id);
  }

  async updated(id: string, userRequest: UserDTO): Promise<User> {
    return await this.userRepository.updated(id, userRequest);
  }

  async destroy(id: string): Promise<void> {
    await this.userRepository.destroy(id);
  }
}
