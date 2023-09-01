import { Controller, Get , UseGuards, Req, Res} from '@nestjs/common';
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
    const access_token = this.googleAuthService.googleLogin(req);
    const token : string = access_token['access_token'];
    
    const decodedToken = this.jwtService.verify(token);
   
    res.cookie('access_token', token,{
      httpOnly: false,
            secure: false,
            expires: new Date(Date.now() + 1 * 24 * 600 * 10000),
    });
    // const front_url = this.configService.get<string>('FRONT_IP');

    if (decodedToken.firstLogin)
    {
      res.redirect('http://localhost:3000/Setup');
    }
    if (decodedToken.isTwoFactorAuthenticationEnabled)
    {
      res.redirect('http://localhost:3000/2fa/Authenticate');
    }
    else
    {
      res.redirect('http://localhost:3000/');
    }
    
  }

}