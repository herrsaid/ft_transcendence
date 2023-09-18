import { IsBoolean, IsEmail, IsNumberString, IsString, isBoolean, isString } from "class-validator";

export class CreateUserDto{

    @IsString()
    username:string;

    @IsEmail()
    email:string;

    @IsString()
    profile_img?:string;

    @IsString()
    avatar?:string;

}


export class updateUsername{

    @IsString()
    username:string;
}


export class updateAvatar{

    @IsString()
    profile_img:string;
}

export class updateImage{

    @IsString()
    avatar:string;
}

export class filterUsersdto{

    @IsString()
    search:string;
}

export class updateAvatar_bol{

    @IsBoolean()
    is_profile_img_updated:boolean;
}


export class updateStatus{

    @IsBoolean()
    status:boolean;
}


export class updateGameStatus{

    @IsBoolean()
    isInGame:boolean;
}