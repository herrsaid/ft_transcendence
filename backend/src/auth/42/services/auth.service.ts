import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    loginIntra42(req)
    {
        if(!req.user)
            return "No user from intra";
        return{
            access_token : req.user.access_token
            }
    }
}
