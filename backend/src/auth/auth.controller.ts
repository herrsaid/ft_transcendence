import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}
  @Get('42')
  @UseGuards(AuthGuard('42'))
  async loginWith42() {
    
  }

  @Get('42/callback')
  @UseGuards(AuthGuard('42'))
  async loginWith42Callback(@Req() req: Request, @Res() res: Response) {
      return this.authservice.loginIntra42(req);
  }
}
