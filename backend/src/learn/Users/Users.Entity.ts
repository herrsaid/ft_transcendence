import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UsersEntity {
  @IsString()
  @IsNotEmpty()
  UserName: string;
  @IsEmail()
  @IsNotEmpty()
  Email: string;
  @IsString()
  @IsNotEmpty()
  Country: string;
  @IsNumber()
  @IsNotEmpty()
  ID: number;
}
