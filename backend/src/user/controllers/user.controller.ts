import * as dotenv from 'dotenv';
dotenv.config();
import { BadRequestException, Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, NotFoundException, Param, ParseFilePipe, Post, Put, Query, Req, Request, Res, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
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
import { HistoryManager } from 'src/game/data_manager/HistoryManager';
import { GameInfoManager } from 'src/game/data_manager/GameInfoManager';
import { ArchievementManager } from 'src/game/data_manager/ArchievementManager';
import { JwtTwoFactorGuard } from 'src/twoFactorAuthentication/services/authentication.service';

const v4id = uuidv4()

@Controller('user')
export class UserController {
    
    constructor(private readonly userService:UserService, private jwtService: JwtService, private readonly HistoryManager:HistoryManager,
        private readonly GameInfoManager:GameInfoManager, private readonly ArchievementManager:ArchievementManager)
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
    @UseGuards(JwtTwoFactorGuard)
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
        try{
            const user = await this.userService.findOneByUsername(username);
        
            if (!user)
                throw new NotFoundException();
            return user;
        }
        catch{
            throw new UnauthorizedException();
        }
        
    }


    @UseGuards(AuthGuard)
    @Get('id/:userId')
    async findUserById(@Param('userId') userStringId:string)
    {
        try{
            const userId = parseInt(userStringId);
            const user = await this.userService.findOne(userId);
            if (!user)
                throw new NotFoundException();
            return user;
        }
        catch{
            throw new UnauthorizedException();
        }
    }



    //block user


    @UseGuards(AuthGuard)
    @Post('friend-request/block/:receiverId')
    blockUser(@Param('receiverId') receiverStringId:string, @Request() req)
    {
        try{
            const receiverId = parseInt(receiverStringId);
            delete(req.user.iat)
            delete(req.user.exp)
            return this.userService.blockUser(receiverId, req.user);
        }
        catch{
            throw new UnauthorizedException();
        }
        
    }



    @UseGuards(AuthGuard)
    @Get('block/status/:receiverId')
    getBlockStatus(@Param('receiverId') receiverStringId:string, @Request() req)
    {
        try{
            const receiverId = parseInt(receiverStringId);
            if (!isNaN(receiverId))
                return this.userService.getBlockStatus(receiverId, req.user);
            delete(req.user.iat)
            delete(req.user.exp)
    }
        catch{
            throw new UnauthorizedException();
        }
    }





    @UseGuards(AuthGuard)
    @Post('friend-request/send/:receiverId')
    sendFriendRequest(@Param('receiverId') receiverStringId:string, @Request() req)
    {
        try{
            const receiverId = parseInt(receiverStringId);
            delete(req.user.iat)
            delete(req.user.exp)
            return this.userService.sendFriendRequest(receiverId, req.user);
        }
        catch{
            throw new UnauthorizedException();
        }
    }

    @UseGuards(AuthGuard)
    @Get('friend-request/status/:receiverId')
    getFriendRequestStatus(@Param('receiverId') receiverStringId:string, @Request() req)
    {
        try{
            const receiverId = parseInt(receiverStringId);
            if (!isNaN(receiverId))
                return this.userService.getFriendRequestStatus(receiverId, req.user);
            delete(req.user.iat)
            delete(req.user.exp)
        }
        catch{
            throw new UnauthorizedException();
        }
    }



    @UseGuards(AuthGuard)
    @Put('friend-request/response/:friendRequestId')
    respondToFriendRequest(@Param('friendRequestId') friendRequestStringId:string, @Body() statusResponse: FriendRequestStatus)
    {
        try{
            const friendRequestId = parseInt(friendRequestStringId);
            return this.userService.respondToFriendRequest(friendRequestId, statusResponse.status);
        }
        catch{
            throw new UnauthorizedException();
        }
    }

    @UseGuards(AuthGuard)
    @Get('friend-request/remove/:friendRequestId')
    removeFriendRequest(@Param('friendRequestId') friendRequestStringId:string)
    {
        try{
            const friendRequestId = parseInt(friendRequestStringId);
            return this.userService.deleteFriendRequest(friendRequestId);
        }
        catch{
            throw new UnauthorizedException();
        }
    }

    

    @UseGuards(AuthGuard)
    @Get('friend-request/me/received-requests')
    getFriendRequest(@Request() req)
    {
        try{
            return this.userService.getFriendRequest(req.user);
        }
        catch{
            throw new UnauthorizedException();
        }
    }



    @UseGuards(AuthGuard)
    @Get('friends/me')
    getMyFriends(@Request() req)
    {
        try{
            return this.userService.getAllMyFriends(req.user);
        }
        catch{
            throw new UnauthorizedException();
        }
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
            
            const imagePath = ('/user/profile-img/' + file.filename);
            const full_path = process.env.IP + ":1337" + imagePath;
        this.userService.updateImage(req.user.id, {"avatar": full_path})
        return this.userService.updateAvatar(req.user.id, {"profile_img" : file.filename});
    }


    

    @Get('profile-img/:path')
    async getProfileImage(@Param('path') path, @Res() res)
    {
        try {
            const imagePath = join(process.cwd(), 'uploadedFiles/avatars/' + path);
            
            const fileExists = await this.userService.checkFileExists(imagePath);
      
            if (!fileExists) {
              const defaultImagePath = join(process.cwd(), 'asset/default.png');
              return res.sendFile(defaultImagePath);
            }
      
            return res.sendFile(imagePath);
          } catch (error) {
            throw new NotFoundException();
          }
    }



    @UseGuards(AuthGuard)
    @Put('edit/me/username')
    updateUsername(@Body() updateUsername: updateUsername, @Request() req)
    {
        try
        {
            return this.userService.updateUsername(req.user.id, updateUsername);
        }
        catch{
            throw new BadRequestException();
        }
        
    }

    @Get(':id')
    findOne(@Param('id') id:number)
    {
        try
        {
            return this.userService.findOne(id);
        }
        catch{
            throw new BadRequestException();
        }
    }

    @Post()
    create(@Body() CreateUserDto: CreateUserDto)
    {
        try
        {
            return this.userService.create(CreateUserDto);
        }
        catch{
            throw new BadRequestException();
        }
    }




    @UseGuards(AuthGuard)
    @Get('history/me')
    getMyHistoryMatch(@Request() req)
    {
        try
        {
            return this.HistoryManager.GetAllHistorysByUsername(req.user.id);
        }
        catch{
            throw new BadRequestException();
        }
        
    }

    @UseGuards(AuthGuard)
    @Get('history/match/:id')
    getHistoryUserMatch(@Param('id') id:number)
    {
        try
        {
            return this.HistoryManager.GetAllHistorysByUsername(id);
        }
        catch{
            throw new BadRequestException();
        }
        
    }



    @UseGuards(AuthGuard)
    @Get('stats/me')
    getMyStats(@Request() req)
    {
        try
        {
            return this.GameInfoManager.GetGameInfoByUsername(req.user.id);
        }
        catch{
            throw new BadRequestException();
        }
        
    }


    @UseGuards(AuthGuard)
    @Get('stats/match/:id')
    getStatsUser(@Param('id') id:number)
    {
        try
        {
            return this.GameInfoManager.GetGameInfoByUsername(id);
        }
        catch{
            throw new BadRequestException();
        }
       
    }



    @UseGuards(AuthGuard)
    @Get('rank/me')
    async getMyRank(@Request() req)
    {
        try
        {
            return await this.GameInfoManager.GetRankByUserId(req.user.id);
        }
        catch{
            throw new BadRequestException();
        }
        
    }


    @UseGuards(AuthGuard)
    @Get('rank/player/:id')
    getRankUser(@Param('id') id:number)
    {
        try
        {
            return this.GameInfoManager.GetRankByUserId(id);
        }
        catch{
            throw new BadRequestException();
        }
        
    }



    @UseGuards(AuthGuard)
    @Get('archievements/me')
    getMyArchievements(@Request() req)
    {
        try
        {
            return this.ArchievementManager.GetAllUserArchievementByUsername(req.user.id);
        }
        catch{
            throw new BadRequestException();
        }
        
    }


    @UseGuards(AuthGuard)
    @Get('archievements/player/:id')
    getArchievementsUser(@Param('id') id:number)
    {
        try
        {
            return this.ArchievementManager.GetAllUserArchievementByUsername(id);
        }
        catch{
            throw new BadRequestException();
        }
        
    }
    


    @UseGuards(AuthGuard)
    @Post('log-out')
    logOut(@Req() request, @Res() response) {
        
        response.cookie('access_token', '',{
            httpOnly: false,
                  secure: false,
                  path: "/",
                  maxAge: 0,
                 
          });
      return response.sendStatus(200);
    }
   
}


