import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-42';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, '42') {
  constructor() {
    super({
      clientID: 'u-s4t2ud-c23c837b8aa6b7a4f906cc1ec6663ee2f70ab478c53bd43763996d7c479c8d26',
      clientSecret: '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',
      callbackURL: 'http://localhost:1337/auth/42/callback',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
    return profile;
  }
}
