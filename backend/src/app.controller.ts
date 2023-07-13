import { Controller, Get , UseGuards, Req, Res} from '@nestjs/common';
import { AppService } from './app.service';

import {AuthGuard} from "@nestjs/passport"
import { Request, Response } from 'express';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    
  }


  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req:Request, @Res() res:Response)
  {
    const access_token = this.appService.googleLogin(req);
    const token : string = access_token['access_token'];
   
    res.cookie('access_token', token,{
      httpOnly: false,
            secure: false,
            sameSite: 'lax',
            expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
    });
    res.redirect('http://localhost:3000/profile');
    
    return this.appService.googleLogin(req)
  }

}
