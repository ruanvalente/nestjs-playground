import { Injectable } from '@nestjs/common';

import { UserDTO } from './../dto/user';

@Injectable()
export class UserService {
  private data = [
    {
      username: 'Ruan Valente',
      age: 25,
      email: 'email@email.com',
    },
    {
      username: 'Ruan Valente',
      age: 25,
      email: 'email@email.com',
    },
    {
      username: 'Ruan Valente',
      age: 25,
      email: 'email@email.com',
    },
    {
      username: 'Ruan Valente',
      age: 25,
      email: 'email@email.com',
    },
  ];

  findAll(): Array<UserDTO> {
    return this.data;
  }

  store(user: UserDTO): void {
    this.data.push(...this.data, user);
  }
}
