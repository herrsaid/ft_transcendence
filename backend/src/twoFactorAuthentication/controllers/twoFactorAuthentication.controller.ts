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
    BadRequestException,
  } from '@nestjs/common';
  import { TwoFactorAuthenticationService } from '../services/twoFactorAuthentication.service';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UserService } from 'src/user/services/user.service';
import { TwoFactorAuthenticationCodeDto } from '../dto/TwoFactorAuthenticationCodeDto';
import { AuthenticationService } from '../services/authentication.service';

 
   
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
      
      try{
        const { otpauthUrl } = await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(request.user);
     
        return this.twoFactorAuthenticationService.pipeQrCodeStream(response, otpauthUrl);
      }
      catch{
        throw new BadRequestException();
      }
    }




  @UseGuards(AuthGuard)
  @Post('turn-on')
  @HttpCode(200)
  async turnOnTwoFactorAuthentication(
    @Req() request: RequestWithUser,
    @Body() { twoFactorAuthenticationCode } : TwoFactorAuthenticationCodeDto
  ) {

    try
    {
      const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
        twoFactorAuthenticationCode, request.user
      );
  
      if (!isCodeValid) {
        throw new UnauthorizedException('Wrong authentication code');
      }
      await this.userService.turnOnTwoFactorAuthentication(request.user.id);

    }
    catch{
      throw new UnauthorizedException();
    }
     
  }



  @UseGuards(AuthGuard)
  @Post('turn-off')
  @HttpCode(200)
  async turnOffTwoFactorAuthentication(
    @Req() request: RequestWithUser,
    @Body() { twoFactorAuthenticationCode } : TwoFactorAuthenticationCodeDto
  ) {

    try
    {
      const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
        twoFactorAuthenticationCode, request.user
      );
  
      if (!isCodeValid) {
        throw new UnauthorizedException('Wrong authentication code');
      }
      await this.userService.turnOffTwoFactorAuthentication(request.user.id);

    }
    catch{
      throw new UnauthorizedException();
    }
     
  }



  @UseGuards(AuthGuard)
  @Post('authenticate')
  @HttpCode(200)
  async authenticate(
    @Req() request: RequestWithUser,
    @Body() { twoFactorAuthenticationCode } : TwoFactorAuthenticationCodeDto
  ) {
    try
    {
      const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
        twoFactorAuthenticationCode, request.user
      );
      if (!isCodeValid) {
        throw new UnauthorizedException('Wrong authentication code');
      }
   
      const accessTokenCookie = this.authenticationService.getCookieWithJwtAccessToken(request.user.id, true);
   
      return {"twofactortoken":accessTokenCookie}
    }
    catch{
      throw new UnauthorizedException();
    }
  }
    
  }