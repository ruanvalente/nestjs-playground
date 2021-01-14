import { HttpException, HttpStatus } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { hash } from 'bcrypt';

import { User } from 'src/user/entity/user.entity';
import { UserDTO } from '../user/dto/user';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  async store(userDTO: UserDTO): Promise<User> {
    const { username, name, age, email, password } = userDTO;

    const user = this.create();

    user.username = username;
    user.name = name;
    user.age = age;
    user.email = email;
    user.password = await this.hashPassword(password);

    try {
      await user.save();
      return user;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new HttpException(
          'Email address already registered',
          HttpStatus.CONFLICT,
        );
      } else {
        throw new HttpException(
          'Failed to register user',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async index(): Promise<User[]> {
    const users = this.find();

    if (!users) {
      throw new HttpException('No data currently registered', HttpStatus.OK);
    }

    return users;
  }
}
