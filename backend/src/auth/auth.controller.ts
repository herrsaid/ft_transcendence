import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}


  
  @Get('42')
  @UseGuards(AuthGuard('42'))
  async loginWith42(@Req() req) {
    
  }



  @Get('42/callback')
  @UseGuards(AuthGuard('42'))
  async loginWith42Callback(@Req() req:Request, @Res() res:Response) {

    const access_token = this.authservice.loginIntra42(req);
    const token : string = access_token['access_token'];
   
    res.cookie('access_token', token,{
      httpOnly: false,
            secure: false,
            expires: new Date(Date.now() + 1 * 24 * 600 * 10000),
    });
    res.redirect('http://localhost:3000/profile');
      return this.authservice.loginIntra42(req);
  }
}
