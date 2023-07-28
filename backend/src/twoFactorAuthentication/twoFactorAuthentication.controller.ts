import {
    ClassSerializerInterceptor,
    Controller,
    Post,
    UseInterceptors,
    Res,
    UseGuards,
    Req,
    HttpCode,
    Body,
    UnauthorizedException,
  } from '@nestjs/common';
  import { TwoFactorAuthenticationService } from './twoFactorAuthentication.service';
import RequestWithUser from './requestWithUser.interface';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UserService } from 'src/user/user.service';
import { TwoFactorAuthenticationCodeDto } from './dto/TwoFactorAuthenticationCodeDto';
import { AuthenticationService } from './authentication.service';

 
   
  @Controller('2fa')
  @UseInterceptors(ClassSerializerInterceptor)
  export class TwoFactorAuthenticationController {
    constructor(
      private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
      private readonly userService: UserService,
      private readonly authenticationService: AuthenticationService
    ) {}
   
    @UseGuards(AuthGuard)
    @Post('generate')
    async register(@Res() response, @Req() request: RequestWithUser) {
      // console.log(request)
      const { otpauthUrl } = await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(request.user);
   
      return this.twoFactorAuthenticationService.pipeQrCodeStream(response, otpauthUrl);
    }




  @UseGuards(AuthGuard)
  @Post('turn-on')
  @HttpCode(200)
  async turnOnTwoFactorAuthentication(
    @Req() request: RequestWithUser,
    @Body() { twoFactorAuthenticationCode } : TwoFactorAuthenticationCodeDto
  ) {

    const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
      twoFactorAuthenticationCode, request.user
    );

    // console.log(isCodeValid)
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    await this.userService.turnOnTwoFactorAuthentication(request.user.id);
     
  }



  @UseGuards(AuthGuard)
  @Post('authenticate')
  @HttpCode(200)
  async authenticate(
    @Req() request: RequestWithUser,
    @Body() { twoFactorAuthenticationCode } : TwoFactorAuthenticationCodeDto
  ) {
    const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
      twoFactorAuthenticationCode, request.user
    );
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }
 
    const accessTokenCookie = this.authenticationService.getCookieWithJwtAccessToken(request.user.id, true);
 
    request.res.setHeader('Set-Cookie', [accessTokenCookie]);
 
    return request.user;
  }
    
  }