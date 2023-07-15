
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Req,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { jwtConstants } from './constants';

  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        console.log("no token");
        throw new UnauthorizedException();
      }
      try {
        const payload   = await this.jwtService.verifyAsync(
          token,
          {
            secret: jwtConstants.secret
          }
        );    
        // request['user'] = payload;
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(@Req() req) :string{
      // console.log("==========");
      let cookie_str = req?.headers?.cookie
      // console.log(cookie_str)

      if (cookie_str)
      {
        try
        {

          let position = cookie_str.search("n=");
          
          let result = cookie_str.substr(position + 2);
          // console.log(result)
        
          return result;
        }
        catch{
            return "no token"
        }

      }
      else
        return "no token"
    }
  }
  