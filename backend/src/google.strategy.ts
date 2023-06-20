import {PassportStrategy} from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20"
import { Injectable } from "@nestjs/common";

@Injectable()

export class GoogleStrategy extends PassportStrategy(Strategy, 'google')
{
    constructor(){
        super({
            clientID: '601566209551-rrmmg509qmjtgrmmgei05kqs9a2jjs6j.apps.googleusercontent.com',
            clientSecret: "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",
            callbackURL: "http://localhost:1337/auth/google/callback",
            scope: ['email', 'profile']
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>{
            const {name, emails, photos} = profile
            const user = {
                email: emails[0].value,
                firstName: name.givenName,
                lastName: name.familyName,
                picture: photos[0].value,
                accessToken
            }
            done(null,user)
    }
}