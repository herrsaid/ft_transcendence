import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { WsException } from '@nestjs/websockets';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class SockAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const client = context.switchToWs().getClient();

    // Access the token from the query parameters, headers, or any other place where you expect it
    const token = client.handshake.query.token;
    console.log("zabi")
    try {
      // Replace 'your_secret_key' with your actual JWT secret key used to sign the token
      const decodedToken = jwt.verify(token, 'your_secret_key');
      // You can do further validation or attach the user data to the client object
      client.user = decodedToken;
      return true;
    } catch (error) {
      // Handle invalid or expired tokens here
      throw new WsException('Unauthorized');
    }
  }
}
