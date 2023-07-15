import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Req, Request, Res, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';


@Controller('user')
export class UserController {

    constructor(private readonly userService:UserService, private jwtService: JwtService)
    {}

    
    // @UseGuards(AuthGuard)
    @Get('me')
    profileInfo(@Req() req)
    {
        try{
            console.log(req.headers)
            let cookie_str = req?.headers?.cookie
            let position = cookie_str.search("n=");
              
            let result = cookie_str.substr(position + 2);
            
            const decodedJwtAccessToken = this.jwtService.decode(result);
            
            return this.userService.findOne(decodedJwtAccessToken['sub'])
        }
        catch{
            throw new UnauthorizedException();
        }

    }


    @Post('edit/avatar')
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
        async uploadFile(@UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
                  ],
            }),

        ) file: Express.Multer.File)
        
        {

            // return this.userService.addAvatar(request.user.id, {
            //     path: file.path,
            //     filename: file.originalname,
            //     mimetype: file.mimetype
            //   });
        console.log(file);
        return {
            statusCode: 200,
            data: file.path,
          };
    }


    // @UseGuards(AuthGuard)
    @Get('/friends')
    getFriends(@Req() req:Request)
    {
        const tocken_part = req.headers['authorization'].split(' ')
        const decodedJwtAccessToken = this.jwtService.decode(tocken_part[1]);
        return this.userService.findAllFriends(decodedJwtAccessToken['sub'])
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


