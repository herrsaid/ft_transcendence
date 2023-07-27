import {PassportStrategy} from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20"
import { Injectable, Res } from "@nestjs/common";
import { UserService } from "./user/user.service";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from "@nestjs/config";

@Injectable()

export class GoogleStrategy extends PassportStrategy(Strategy, 'google')
{
    constructor(private readonly UserService:UserService, private jwtService: JwtService, private readonly configService: ConfigService){
        super({
            clientID: configService.get<string>('CLIENT_ID'),
            clientSecret: configService.get<string>('CLIENT_SECRET'),
            callbackURL: "http://localhost:1337/auth/google/callback",
            scope: ['email', 'profile']
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>{
           
        const {name, emails, photos} = profile

        const user_check = await this.UserService.findUserByEmail(emails[0].value);
        
        if (user_check)
        {

            const payload = {id : user_check.id, username: user_check.username, email : emails[0].value, twoFactorAuthenticationSecret:user_check.twoFactorAuthenticationSecret};
        
            
            return {
                access_token: await this.jwtService.signAsync(payload),
            };

        }
        else{
            const user = await this.UserService.create({
                email: emails[0].value,
                username: name.familyName,
                profile_img: photos[0].value
            })

            const user_check = await this.UserService.findUserByEmail(emails[0].value);
            if (user_check)
            {
                const payload = {id : user_check.id, username: user_check.username, email : emails[0].value , twoFactorAuthenticationSecret:user_check.twoFactorAuthenticationSecret};
        
                return {
                    access_token: await this.jwtService.signAsync(payload),
                };
            }
        }
        
    }

}