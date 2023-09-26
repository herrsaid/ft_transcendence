import { BadRequestException, Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/services/user.service';
import { User } from 'src/entities/user/user.entity';
import { toFileStream } from 'qrcode';
 
@Injectable()
export class TwoFactorAuthenticationService {
  constructor (
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {}
 
    async generateTwoFactorAuthenticationSecret(user: User) {
      try
      {
          const secret = authenticator.generateSecret();
      
          const otpauthUrl = authenticator.keyuri(user.email, this.configService.get('TWO_FACTOR_AUTHENTICATION_APP_NAME'), secret);
      
          await this.userService.setTwoFactorAuthenticationSecret(secret, user.id);
      
          return {
            secret,
            otpauthUrl
          }
      }
      catch{
        throw new BadRequestException();
      }
  }


  async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    try
    {
      return toFileStream(stream, otpauthUrl);
    }
    catch{
      throw new BadRequestException();
    }
      
  }


  isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode: string, user: User) {
    try
    {
      return authenticator.verify({
        token: twoFactorAuthenticationCode,
        secret: user.twoFactorAuthenticationSecret
      })

    }
    catch{
      throw new BadRequestException();
    }

  }



}


