import { IsString } from "class-validator";

export class TwoFactorAuthenticationCodeDto{

    
    @IsString()
    twoFactorAuthenticationCode:string;

}