import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService, private readonly configService: ConfigService) {}


  
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

    const front_url = this.configService.get<string>('FRONT_IP');
    res.redirect(`${front_url}/profile`);

      return this.authservice.loginIntra42(req);
  }
}
