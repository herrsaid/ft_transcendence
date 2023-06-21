import { IsEmail, IsNumberString, IsString } from "class-validator";

export class CreateUserDto{

    @IsString()
    username:string;

    @IsEmail()
    email:string;

}