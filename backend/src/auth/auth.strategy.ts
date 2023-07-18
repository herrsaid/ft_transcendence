import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-42';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, '42') {
  constructor(private readonly UserService:UserService, private jwtService: JwtService) {
    super({
      clientID: 'u-s4t2ud-c23c837b8aa6b7a4f906cc1ec6663ee2f70ab478c53bd43763996d7c479c8d26',
      clientSecret: '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',
      callbackURL: 'http://localhost:1337/auth/42/callback',
      
      
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
    


    console.log(profile)
    const {name, emails, photos} = profile

        const user_check = await this.UserService.findUserByEmail(emails[0].value);
        
        if (user_check)
        {

            const payload = {sub : user_check.id, username: user_check.username};
        
            
            return {
                access_token: await this.jwtService.signAsync(payload),
            };

        }
        else{
          const user = await this.UserService.create({
              email: emails[0].value,
              username: profile.username,
              profile_img: profile._json.image.link
          })

          const user_check = await this.UserService.findUserByEmail(emails[0].value);
          if (user_check)
          {
              const payload = {sub : user_check.id, username: user_check.username};
      
              return {
                  access_token: await this.jwtService.signAsync(payload),
              };
          }
      }
  }
}
