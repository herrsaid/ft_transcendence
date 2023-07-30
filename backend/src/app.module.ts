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
import { GoogleStrategy } from './auth/google/strategy/google.strategy';
import { UserModule } from './user/modules/user.module';
import { UserService } from './user/services/user.service';
import { UserController } from './user/controllers/user.controller';
import { User } from './entities/user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/guard/constants';
import { GameModule } from './game/PingPong.module';
import { Achievevement } from './entities/achievevements/achievevements.entity';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FriendRequest } from './entities/friend/friend-request.entity';
import { ConfigModule } from '@nestjs/config';
import { TwoFactorAuthenticationController } from './twoFactorAuthentication/controllers/twoFactorAuthentication.controller';
import { TwoFactorAuthenticationService } from './twoFactorAuthentication/services/twoFactorAuthentication.service';
import { AuthenticationService } from './twoFactorAuthentication/services/authentication.service';
import { GoogleAuthController } from './auth/google/controllers/googleauth.controller';
import { GoogleAuthService } from './auth/google/services/googleauth.service';
import { MessagesService } from 'Database/services/messages/messages.service';
import { MessageService } from './message/message.service';
import { Messages } from 'Database/entity/Message.entity';
import { MessagesController } from './messages/messages.controller';

@Module({
  imports: [GameModule, AuthModule, TypeOrmModule.forRoot(config),

    ConfigModule.forRoot({isGlobal: true }),
   
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..')
    }),
    UserModule,
  
    TypeOrmModule.forFeature([User,Achievevement,FriendRequest,Messages]), JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '30d' },
   
  }),],
  controllers: [AppController, TestController, AuthController, UserController, TwoFactorAuthenticationController, GoogleAuthController, MessagesController],

  providers: [
    AppService,
    WebsockGateway,
    AuthService,
    AuthStrategy,
    GoogleStrategy,
    UserService,
    TwoFactorAuthenticationService,
    AuthenticationService,
    GoogleAuthService,
    MessagesService,
    MessageService,
  ],
})
export class AppModule {}
