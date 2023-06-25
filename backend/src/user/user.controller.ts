import { Body, Controller, Get, Param, Post, Request, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {

    constructor(private readonly userService:UserService)
    {}

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


    @UseGuards(AuthGuard)
    @Get()
    getProfile(@Request() req, @Res() res)
    {
        res.cookie('access_token', 'test', {
            maxAge:36000000,
            httpOnly:true,
        })
        return (req.user);
    }
}
