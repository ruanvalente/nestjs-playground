import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../entity/user.entity';
import { UserDTO } from './../dto/user';
import { UserRepository } from './../../repository/user.repository';

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
      return this.userRepository.store(userDTO);
    }
  }

  async index(): Promise<User[]> {
    return this.userRepository.index();
  }

  async show(id: string): Promise<User> {
    return this.userRepository.show(id);
  }
}
