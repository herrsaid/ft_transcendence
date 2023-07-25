import { IsEmail, IsNumberString, IsString, isString } from "class-validator";

export class CreateUserDto{

    @IsString()
    username:string;

    @IsEmail()
    email:string;

    @IsString()
    profile_img?:string;

}


export class updateUsername{

    @IsString()
    username:string;
}


export class updateAvatar{

    @IsString()
    profile_img:string;
}