import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    loginIntra42(req)
    {
        if(!req.user)
            return "No user from intra";
        return{
            user: req.user
            }
    }
}
