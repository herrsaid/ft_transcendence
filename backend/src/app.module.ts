import * as dotenv from 'dotenv';
dotenv.config();

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestController } from './test/test.controller';
import { WebsockGateway } from './websock/websock.gateway';
import { AuthService } from './auth/42/services/auth.service';
import { AuthModule } from './auth/42/modules/auth.module';
import { AuthStrategy } from './auth/42/strategy/auth.strategy';
import { AuthController } from './auth/42/controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { UserModule } from './user/modules/user.module';
import { UserService } from './user/services/user.service';
import { UserController } from './user/controllers/user.controller';
import { User } from './entities/user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { GameModule } from './game/PingPong.module';
import { FriendRequest } from './entities/friend/friend-request.entity';
import { ConfigModule } from '@nestjs/config';
import { TwoFactorAuthenticationController } from './twoFactorAuthentication/controllers/twoFactorAuthentication.controller';
import { TwoFactorAuthenticationService } from './twoFactorAuthentication/services/twoFactorAuthentication.service';
import { AuthenticationService } from './twoFactorAuthentication/services/authentication.service';
import { MessagesService } from 'Database/services/messages/messages.service';
import { MessageService } from './message/message.service';
import { Messages } from 'Database/entity/Message.entity';
import { MessagesController } from './messages/messages.controller';
import { HistoryManager } from './game/data_manager/HistoryManager';
import { GameArchievement, GameUserInfo, History } from './game/PingPong.Entity';
import { GameInfoManager } from './game/data_manager/GameInfoManager';
import { ArchievementManager } from './game/data_manager/ArchievementManager';
import { GroupsController } from './groups/groups.controller';
import Groups from 'Database/entity/Groups.entity';
import { GroupsService } from 'Database/services/groups/groups.service';
import { WebSocketGateWayFilter } from './game/PingPong.filter';
import GroupUsers from 'Database/entity/GroupUsers.entity';
import { GroupusersService } from 'Database/services/groupusers/groupusers.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
@Module({
  imports: [GameModule, AuthModule, TypeOrmModule.forRoot(config),

    ConfigModule.forRoot({isGlobal: true }),
    EventEmitterModule.forRoot(),
    UserModule,
  
    TypeOrmModule.forFeature([User,FriendRequest,Messages,History,GameUserInfo,GameArchievement,Groups,GroupUsers]), JwtModule.register({
    global: true,
    secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    signOptions: { expiresIn: '30d' },
   
  }),],
  controllers: [AppController, TestController, AuthController, UserController, TwoFactorAuthenticationController, MessagesController, GroupsController,],

  providers: [
    AppService,
    WebsockGateway,
    AuthService,
    AuthStrategy,
    UserService,
    TwoFactorAuthenticationService,
    AuthenticationService,
    MessagesService,
    MessageService,
    HistoryManager,
    GameInfoManager,
    ArchievementManager,
    GroupsService,
    WebSocketGateWayFilter,
    GroupusersService
  ],
})
export class AppModule {}
