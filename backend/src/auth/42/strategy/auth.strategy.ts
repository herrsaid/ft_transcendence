import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-42';
import { UserService } from 'src/user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, '42') {
  constructor(private readonly UserService:UserService, private jwtService: JwtService, private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('CLIENT_ID_42'),
      clientSecret: configService.get<string>('CLIENT_SECRET_42'),
      callbackURL: configService.get<string>('INTRA_CALL_BACK'),
      
      
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
    try
    {
      const {name, emails, photos} = profile
  
          const user_check = await this.UserService.findUserByEmail(emails[0].value);
          
          if (user_check)
          {
  
              const payload = {id : user_check.id, username: user_check.username,
                 email : emails[0].value, twoFactorAuthenticationSecret:user_check.twoFactorAuthenticationSecret,
                  isTwoFactorAuthenticationEnabled:user_check.isTwoFactorAuthenticationEnabled,
                  firstLogin:false
                };
          
              
              return {
                  access_token: await this.jwtService.signAsync(payload),
              };
  
          }
          else{
            const user = await this.UserService.create({
                email: emails[0].value,
                username: profile.username,
                profile_img: profile._json.image.link,
                avatar:profile._json.image.link
            })
  
            const user_check = await this.UserService.findUserByEmail(emails[0].value);
            if (user_check)
            {
                const payload = {id : user_check.id,
                   username: user_check.username, email : emails[0].value,
                    twoFactorAuthenticationSecret:user_check.twoFactorAuthenticationSecret,
                     isTwoFactorAuthenticationEnabled:user_check.isTwoFactorAuthenticationEnabled,
                     firstLogin:true
                    };
        
                return {
                    access_token: await this.jwtService.signAsync(payload),
                };
            }
        }

    }
    catch{
      throw new UnauthorizedException();
    }

  }
}
