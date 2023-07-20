import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { FriendRequest } from 'src/entities/friend-request.entity';

@Module({
    imports:[TypeOrmModule.forFeature([User,FriendRequest])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
