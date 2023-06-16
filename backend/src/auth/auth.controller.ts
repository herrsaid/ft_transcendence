import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  @Get('42')
  @UseGuards(AuthGuard('42'))
  async loginWith42() {
    // The user will be redirected to the 42 login page
    // and then to the callback URL configured in the AuthStrategy.
    // The actual authentication process is handled by the passport-42 strategy.
  }

  @Get('42/callback')
  @UseGuards(AuthGuard('42'))
  async loginWith42Callback(@Req() req: Request, @Res() res: Response) {
    // Successful authentication, redirect to the desired route
    res.redirect('/dashboard');
  }
}
