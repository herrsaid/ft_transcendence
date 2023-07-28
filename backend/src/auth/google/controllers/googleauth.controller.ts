import { Controller, Get , UseGuards, Req, Res} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport"
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { GoogleAuthService } from '../services/googleauth.service';


@Controller('auth')
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService, private readonly configService: ConfigService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    
  }


  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req:Request, @Res() res:Response)
  {
    const access_token = this.googleAuthService.googleLogin(req);
    const token : string = access_token['access_token'];
   
    res.cookie('access_token', token,{
      httpOnly: false,
            secure: false,
            expires: new Date(Date.now() + 1 * 24 * 600 * 10000),
    });
    const front_url = this.configService.get<string>('FRONT_IP');
    // res.redirect(`${front_url}/user/friends`);
    res.redirect('http://localhost:3000/profile');
    // res.redirect('http://localhost:1337/user/friends');
    return this.googleAuthService.googleLogin(req)
  }

}