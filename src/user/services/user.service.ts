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
  // data = [
  //   {
  //     username: 'ruan',
  //     name: 'Ruan Valente',
  //     age: 25,
  //     email: 'ruan@email.com',
  //   },
  //   {
  //     username: 'lorena',
  //     name: 'Lorena Torres',
  //     age: 27,
  //     email: 'lorena@email.com',
  //   },
  //   {
  //     username: 'bruno',
  //     name: 'Bruno Torres',
  //     age: 33,
  //     email: 'bruno@email.com',
  //   },
  //   {
  //     username: 'matheus',
  //     name: 'Matheus Ribeiro',
  //     age: 21,
  //     email: 'matheus@email.com',
  //   },
  // ];

  // findAll(): Array<UserDTO> {
  //   return this.data;
  // }

  // show(userParams: string): Array<UserDTO> {
  //   const users = this.data.filter(
  //     (data) => data.username.toLocaleLowerCase() === userParams,
  //   );

  //   if (users.length === 0) {
  //     throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //   } else {
  //     return users;
  //   }
  // }

  // store(userParams: UserDTO): void {
  //   const users = this.data.filter(
  //     (data) => data.username.toLocaleLowerCase() === userParams.username,
  //   );

  //   if (users.length === 0) {
  //     this.data.push(userParams);
  //   } else {
  //     throw new HttpException(
  //       'The user already registered',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }

  // update(user: UserDTO): any {
  //   const userUpdate = this.show(user.username);

  //   if (userUpdate.length === 0) {
  //     throw new HttpException('Username not found', HttpStatus.NOT_FOUND);
  //   } else {
  //     userUpdate.map((u) => {
  //       u.age = user.age;
  //       u.name = user.name;
  //       u.email = user.email;
  //       u.username = user.username;
  //     });

  //     return userUpdate;
  //   }
  // }

  // destroy(userParams: any): void {
  //   const userIndex = this.data.findIndex(
  //     (user) => user.username === userParams.username,
  //   );

  //   if (userIndex !== -1) {
  //     this.data.splice(userIndex, 1);
  //   } else {
  //     throw new HttpException('Failed to remove user', HttpStatus.BAD_REQUEST);
  //   }
  // }
}
