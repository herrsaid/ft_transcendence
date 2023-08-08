import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user/user.entity';
import { FriendRequest } from 'src/entities/friend/friend-request.entity';
import { HistoryManager } from 'src/game/data_manager/HistoryManager';
import { GameArchievement, GameUserInfo, History } from 'src/game/PingPong.Entity';
import { GameInfoManager } from 'src/game/data_manager/GameInfoManager';
import { ArchievementManager } from 'src/game/data_manager/ArchievementManager';

@Module({
    imports:[TypeOrmModule.forFeature([User,FriendRequest,History,GameUserInfo,GameArchievement])],
  controllers: [UserController],
  providers: [UserService, HistoryManager, GameInfoManager,ArchievementManager],
  exports: [UserService]
})
export class UserModule {}
