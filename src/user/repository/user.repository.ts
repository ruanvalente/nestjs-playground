import { HttpException, HttpStatus } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { hash } from 'bcrypt';

import { User } from 'src/user/entity/user.entity';
import { UserDTO } from '../dto/user';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  async store(userRequest: UserDTO): Promise<User> {
    const { username, name, age, email, password } = userRequest;

    const user = await this.create();

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
    const users = await this.find();

    if (users.length === 0) {
      throw new HttpException('No data currently registered', HttpStatus.OK);
    }

    return users;
  }

  async show(id: string): Promise<User> {
    const user = await this.findOne(id, {
      select: ['email', 'name', 'username', 'id'],
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async updated(id: string, userRequest: UserDTO): Promise<User> {
    const userUpdated = await this.findOne(id);

    const { name, username, email, password, age } = userRequest;

    if (!userUpdated) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    userUpdated.name = name ? name : userUpdated.name;
    userUpdated.username = username ? username : userUpdated.username;
    userUpdated.email = email ? email : userUpdated.email;
    userUpdated.password = password
      ? await this.hashPassword(password)
      : userUpdated.password;
    userUpdated.age = age ? age : userUpdated.age;

    try {
      await userUpdated.save();
      return userUpdated;
    } catch (error) {
      throw new HttpException(
        'Failed to update user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async destroy(id: string): Promise<void> {
    const user = await this.findOne(id, {
      select: ['id'],
    });

    if (!user) {
      throw new HttpException('User ID not found', HttpStatus.NOT_FOUND);
    }

    await this.delete({ id });
  }
}
