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
      // scope: ['email', 'profile']
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
    // const {name, emails, photos} = profile

    //     const user_check = await this.UserService.findUserByEmail(emails[0].value);
        
    //     if (user_check)
    //     {
    //         const payload = {sub : user_check.id, username: user_check.username};
    //         return {
    //             access_token: await this.jwtService.signAsync(payload),
    //         };

    //         // return user_check;
    //     }
    const user={
      id:1,
      email: "salah@gmail.com",
      username: "selhanda"
    }
    return user;
  }
}
