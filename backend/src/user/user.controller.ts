import { Body, Controller, Get, Param, Post, Request, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {

    constructor(private readonly userService:UserService)
    {}


    @UseGuards(AuthGuard)
    @Get('me')
    profileInfo()
    {
        
        // return req.headers.cookie;
        return [
            {
                id:'1',
                username:'selhanda',
                loss:0
            },
            {
                id:'2',
                username:'selhanda',
                loss:0
            },
            {
                id:'3',
                username:'selhanda',
                loss:0
            },
            {
                id:'4',
                username:'selhanda',
                loss:0
            },
            

        ]
    }

    @Get(':id')
    findOne(@Param('id') id:number)
    {
        return this.userService.findOne(id);
    }

    @Post()
    create(@Body() CreateUserDto: CreateUserDto)
    {
        return this.userService.create(CreateUserDto);
    }
   
}
