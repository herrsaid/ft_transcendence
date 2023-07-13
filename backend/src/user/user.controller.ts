import { Body, Controller, Get, Param, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';


@Controller('user')
export class UserController {

    constructor(private readonly userService:UserService, private jwtService: JwtService)
    {}

    
    @UseGuards(AuthGuard)
    @Get('me')
    profileInfo(@Req() req:Request)
    {
        const tocken_part = req.headers['authorization'].split(' ')
        const decodedJwtAccessToken = this.jwtService.decode(tocken_part[1]);
        
        return this.userService.findOne(decodedJwtAccessToken['sub'])

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


