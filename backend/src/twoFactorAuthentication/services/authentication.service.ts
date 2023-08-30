import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/services/user.service';
import { TokenPayload } from '../interfaces/tokenPayload.interface';
import { Request } from 'express'; 
import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';


@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}
 
  public getCookieWithJwtAccessToken(userId: number, isSecondFactorAuthenticated = false) {
    const payload: TokenPayload = { userId, isSecondFactorAuthenticated };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}d`
    });
    return `${token}`;
  }
 
}



@Injectable()
  export class JwtTwoFactorGuard implements CanActivate {
    constructor(private jwtService: JwtService, private readonly userService: UserService,
      private readonly configService: ConfigService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      const tokenone = this.extractTokenone(request);
      
      try {

        const payloadone   = await this.jwtService.verifyAsync(
          tokenone,
          {
            secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET')
          }
        );
        
        const userone = await this.userService.findOne(payloadone.id);

        if (!userone.isTwoFactorAuthenticationEnabled) {
          return true;
        }
        else
        {
          const payload   = await this.jwtService.verifyAsync(
            token,
            {
              secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET')
            }
          );
          const user = await this.userService.findOne(payload.id);
          if (payload.isSecondFactorAuthenticated) {
            return true;
          }
        }
        
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const stringtoken:string = request.headers.twofactortoken.toString();
      const token = stringtoken;
      return token ? token : undefined;
    }

    private extractTokenone(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }