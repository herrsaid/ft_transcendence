import { Controller, Get , UseGuards, Req, Res, UnauthorizedException} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport"
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { GoogleAuthService } from '../services/googleauth.service';
import { JwtService } from '@nestjs/jwt';


@Controller('auth')
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService, private readonly configService: ConfigService,
    private readonly jwtService: JwtService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    
  }

  

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res:Response)
  {
    try
    {
      const access_token = this.googleAuthService.googleLogin(req);
      const token : string = access_token['access_token'];
    
      const decodedToken = this.jwtService.verify(token);
    
      res.cookie('access_token', token,{
        httpOnly: false,
              secure: false,
      });
      const front_url = this.configService.get<string>('IP') + ":3000";

      if (decodedToken.firstLogin)
      {
        res.redirect(`${front_url}/Setup`);
      }
      if (decodedToken.isTwoFactorAuthenticationEnabled)
      {
        res.redirect(`${front_url}/2fa/Authenticate`);
      }
      else
      {
        res.redirect(`${front_url}/`);
      }
      }
      catch{
        throw new UnauthorizedException();
      }
  }

}