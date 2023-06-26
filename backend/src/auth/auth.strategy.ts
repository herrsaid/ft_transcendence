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
      profileFields: {
        'id': function (obj) { return String(obj.id); },
        'username': 'login',
        'displayName': 'displayname',
        'name.familyName': 'last_name',
        'name.givenName': 'first_name',
        'profileUrl': 'url',
        'emails.0.value': 'email',
        'phoneNumbers.0.value': 'phone',
        'photos.0.value': 'image_url'
      }
      
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, cb: any): Promise<any> {
    


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
              username: name.familyName,
              profile_img: photos[0].value
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
