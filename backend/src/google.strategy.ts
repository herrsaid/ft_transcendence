import {PassportStrategy} from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20"
import { Injectable, Res } from "@nestjs/common";
import { UserService } from "./user/user.service";
import { JwtService } from '@nestjs/jwt';

@Injectable()

export class GoogleStrategy extends PassportStrategy(Strategy, 'google')
{
    constructor(private readonly UserService:UserService, private jwtService: JwtService){
        super({
            clientID: '601566209551-rrmmg509qmjtgrmmgei05kqs9a2jjs6j.apps.googleusercontent.com',
            clientSecret: "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",
            callbackURL: "http://localhost:1337/auth/google/callback",
            scope: ['email', 'profile']
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>{
           
        const {name, emails, photos} = profile

        const user_check = await this.UserService.findUserByEmail(emails[0].value);
        
        if (user_check)
        {

            const payload = {id : user_check.id, username: user_check.username};
        
            
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
                const payload = {id : user_check.id, username: user_check.username};
        
                return {
                    access_token: await this.jwtService.signAsync(payload),
                };
            }
        }
        
    }
    // const user = {
    //     email: emails[0].value,
    //     username: name.givenName
    //     // firstName: name.givenName,
    //     // lastName: name.familyName,
    //     // picture: photos[0].value,
    //     // accessToken
    // }
}