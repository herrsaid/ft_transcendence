import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  googleLogin(req)
  {
    if(!req.user)
      return "No user from google";
    return{
      access_token : req.user.access_token
    }

  }
}
