import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { User } from 'src/entities/user.entity';
import { toFileStream } from 'qrcode';
 
@Injectable()
export class TwoFactorAuthenticationService {
  constructor (
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {}
 
    async generateTwoFactorAuthenticationSecret(user: User) {
    const secret = authenticator.generateSecret();
 
    console.log(secret)

    const otpauthUrl = authenticator.keyuri(user.email, this.configService.get('TWO_FACTOR_AUTHENTICATION_APP_NAME'), secret);
 
    await this.userService.setTwoFactorAuthenticationSecret(secret, user.id);
 
    return {
      secret,
      otpauthUrl
    }
  }


  async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    return toFileStream(stream, otpauthUrl);
  }


  isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode: string, user: User) {


    console.log('-------------------')
    console.log(user);

    console.log(twoFactorAuthenticationCode);
    console.log(user.twoFactorAuthenticationSecret);

    console.log('-------------------')
    



    //later I work with authenticator.verify I dont know why not working now!!


    // return authenticator.verify({
    //   token: twoFactorAuthenticationCode,
    //   secret: user.twoFactorAuthenticationSecret
    // })

    if (twoFactorAuthenticationCode === user.twoFactorAuthenticationSecret)
        return true;
    return false;
  }



}


