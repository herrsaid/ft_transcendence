import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, NotFoundException, Param, ParseFilePipe, Post, Put, Query, Req, Request, Res, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto, filterUsersdto, updateUsername } from '../dto/createUserDto';
import { UserService } from '../services/user.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Observable } from 'rxjs';
import { FriendRequestStatus, FriendRequest_Interface } from 'src/entities/friend/interfaces/friend-request.interface';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

const v4id = uuidv4()

@Controller('user')
export class UserController {
    
    constructor(private readonly userService:UserService, private jwtService: JwtService)
    {}
    
    





    @UseGuards(AuthGuard)
    @Get('search')
    async getUsersSearch(@Req() req)
    {
        try
        {
            const builder = await this.userService.getUsersSearch('user');
            if (req.query.q)
                builder.where("user.username LIKE :q ", {q : `%${req.query.q}%`})
            return await builder.getMany();
        }
        catch
        {
            throw new UnauthorizedException();
        }


        
    }



    @UseGuards(AuthGuard)
    @Get('me')
    profileInfo(@Req() req)
    {
        try
        {
            return this.userService.findOne(req.user.id);
        }
        catch
        {
            throw new UnauthorizedException();
        }
    }
    
    @UseGuards(AuthGuard)
    @Get('friends')
    getAllUsers(@Req() req)
    {
        try{
            return this.userService.findAllUserNotMe(req.user.id);
        }
        catch{
            throw new UnauthorizedException();
        }
    }
    

    @UseGuards(AuthGuard)
    @Get(':username')
    async findOneByUsername(@Param('username') username:string)
    {
        const user = await this.userService.findOneByUsername(username);
        
        if (!user)
            throw new NotFoundException();
        return user;
    }


    @UseGuards(AuthGuard)
    @Get('id/:userId')
    async findUserById(@Param('userId') userStringId:string)
    {
        const userId = parseInt(userStringId);
        const user = await this.userService.findOne(userId);
        if (!user)
            throw new NotFoundException();
        return user;
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



    @UseGuards(AuthGuard)
    @Get('friends/me')
    getMyFriends(@Request() req)
    {
        return this.userService.getAllMyFriends(req.user);
    }



    @UseGuards(AuthGuard)
    @Put('edit/avatar')
        @UseInterceptors(FileInterceptor('file',
        {
            storage: diskStorage({
                destination: './uploadedFiles/avatars',
                filename: (req, file, cb) => {
                    let file_part = file.originalname.split('.')
                    let new_file = file_part[0] + v4id  + "." + file_part[1];
                    cb(null, new_file)
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
            
        return this.userService.updateAvatar(req.user.id, {"profile_img" : file.filename});
    }


    @Get('profile-img/:path')
    getProfileImage(@Param('path') path, @Res() res)
    {
        return res.sendFile(join(process.cwd(), 'uploadedFiles/avatars/' + path));
    }



    @UseGuards(AuthGuard)
    @Put('edit/me/username')
    updateUsername(@Body() updateUsername: updateUsername, @Request() req)
    {
        return this.userService.updateUsername(req.user.id, updateUsername);
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


    @UseGuards(AuthGuard)
    @Post('log-out')
    logOut(@Req() request, @Res() response) {
        
        response.cookie('access_token', '',{
            httpOnly: false,
                  secure: false,
                  path: "/",
                  maxAge: 0,
                //   expires: new Date(Date.now() + 1 * 24 * 600 * 10000),
                 
          });
    //   response.setHeader('Set-Cookie', this.userService.getCookieForLogOut());
      return response.sendStatus(200);
    }
   
}


