import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersEntity } from './Users.Entity';

@Controller('Users')
export class UserController {
  users: UsersEntity[] = [];
  @Get()
  @HttpCode(HttpStatus.OK)
  GetUsers(): UsersEntity[] | string {
    if (this.users.length === 0) return 'no users right now !';
    return this.users;
  }
  @Get(':UserName')
  @HttpCode(HttpStatus.OK)
  GetUser(@Param('UserName') UserName: string): string | UsersEntity[] {
    let validusers: UsersEntity[] = [];
    validusers = this.users.filter((user) => {
      let valid = 1;
      for (let a = 0; a < UserName.length; a++) {
        if (user.UserName[a] != UserName[a]) valid = 0;
        if (a === user.UserName.length) valid = 0;
      }
      if (valid === 1) return validusers;
    });

    if (validusers === undefined) return 'no user have that username !';
    return validusers;
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  CreateUser(@Body() body: UsersEntity): string {
    if (this.users.find((user) => user.UserName === body.UserName))
      return 'UserName alredy exist';
    else if (this.users.find((user) => user.ID === body.ID))
      return 'id alredy exist';
    else if (this.users.find((user) => user.Email === body.Email))
      return 'Email  alredy in use';
    this.users.push(body);
    return 'User was creted succesfully';
  }
  @Patch(':UserName')
  @HttpCode(HttpStatus.OK)
  UpdateUser(
    @Param('UserName') UserName: string,
    @Body() body: UsersEntity,
  ): string {
    const index = this.users.findIndex((user) => user.UserName === UserName);
    if (index === -1) return 'no user have that username !';
    if (this.users.find((user) => user.UserName === body.UserName))
      return 'UserName alredy exist';
    else if (this.users.find((user) => user.ID === body.ID))
      return 'id alredy exist';
    else if (this.users.find((user) => user.Email === body.Email))
      return 'Email  alredy in use';
    this.users[index] = body;
    return 'User was updated succesfully';
  }
  @Delete(':UserName')
  @HttpCode(HttpStatus.NO_CONTENT)
  DeleteUser(@Param('UserName') UserName: string): string {
    const index = this.users.findIndex((user) => user.UserName === UserName);
    if (index === undefined) return 'no user have that username !';
    this.users.splice(index, index);
    return 'User was Deleted succesfully';
  }
}
