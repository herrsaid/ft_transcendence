import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Put, Query, Req, Request, Res, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto, filterUsersdto, updateUsername } from '../dto/createUserDto';
import { UserService } from '../services/user.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Observable } from 'rxjs';
import { FriendRequestStatus, FriendRequest_Interface } from 'src/entities/friend/interfaces/friend-request.interface';



@Controller('user')
export class UserController {
    
    constructor(private readonly userService:UserService, private jwtService: JwtService)
    {}
    
    





    @UseGuards(AuthGuard)
    @Get('search')
    async getUsersSearch(@Req() req)
    {
        const builder = await this.userService.getUsersSearch('user');


        if (req.query.q)
        {
            builder.where("user.username LIKE :q ", {q : `%${req.query.q}%`})
        }
        return await builder.getMany();
        
    }



    @UseGuards(AuthGuard)
    @Get('me')
    profileInfo(@Req() req)
    {
        
        const tocken_part = req.headers['authorization'].split(' ')
        const decodedJwtAccessToken = this.jwtService.decode(tocken_part[1]);
        return this.userService.findOne(decodedJwtAccessToken['id'])
        
    }
    
    @UseGuards(AuthGuard)
    @Get('/friends')
    getFriends(@Req() req:Request)
    {
        const tocken_part = req.headers['authorization'].split(' ')
        const decodedJwtAccessToken = this.jwtService.decode(tocken_part[1]);
        return this.userService.findAllFriends(decodedJwtAccessToken['id'])
    }
    
    @Get(':username')
    findOneByUsername(@Param('username') username:string)
    {
        return this.userService.findOneByUsername(username);
    }


    @UseGuards(AuthGuard)
    @Get(':userId')
    findUserById(@Param('userId') userStringId:string)
    {
        const userId = parseInt(userStringId);
        return this.userService.findOne(userId);
    }




    @UseGuards(AuthGuard)
    @Post('friend-request/send/:receiverId')
    sendFriendRequest(@Param('receiverId') receiverStringId:string, @Request() req)
    {
        const receiverId = parseInt(receiverStringId);
        delete(req.user.iat)
        delete(req.user.exp)
        
        return this.userService.sendFriendRequest(receiverId, req.user);
    }


    @UseGuards(AuthGuard)
    @Get('friend-request/status/:receiverId')
    getFriendRequestStatus(@Param('receiverId') receiverStringId:string, @Request() req)
    {
        const receiverId = parseInt(receiverStringId);
        delete(req.user.iat)
        delete(req.user.exp)
        return this.userService.getFriendRequestStatus(receiverId, req.user);
    }



    @UseGuards(AuthGuard)
    @Put('friend-request/response/:friendRequestId')
    respondToFriendRequest(@Param('friendRequestId') friendRequestStringId:string, @Body() statusResponse: FriendRequestStatus)
    {
        const friendRequestId = parseInt(friendRequestStringId);
        return this.userService.respondToFriendRequest(friendRequestId, statusResponse.status);
    }



    @UseGuards(AuthGuard)
    @Get('friend-request/me/received-requests')
    getFriendRequest(@Request() req)
    {
        return this.userService.getFriendRequest(req.user);
    }




    @Put('edit/avatar')
        @UseInterceptors(FileInterceptor('file',
        {
            storage: diskStorage({
                destination: './uploadedFiles/avatars',
                filename: (req, file, cb) => {
                    cb(null, file.originalname)
                }
              })
        }
        ))
        async uploadFile(@Request() req, @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
                  ],
            }),

        ) file: Express.Multer.File)
        
        {

        const tocken_part = req.headers['authorization'].split(' ')
        const decodedJwtAccessToken = this.jwtService.decode(tocken_part[1]);
        const id = decodedJwtAccessToken['id'];

        return this.userService.updateAvatar(id, {"profile_img" : file.path});
    }

    @UseGuards(AuthGuard)
    @Put('edit/:id')
    updateUsername(@Param('id') stringId:string, @Body() updateUsername: updateUsername)
    {
        const id = parseInt(stringId);
        return this.userService.updateUsername(id, updateUsername);
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


