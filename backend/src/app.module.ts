import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestController } from './test/test.controller';
import { WebsockGateway } from './websock/websock.gateway';
import { AuthService } from './auth/42/auth.service';
import { AuthModule } from './auth/42/auth.module';
import { AuthStrategy } from './auth/42/auth.strategy';
import { AuthController } from './auth/42/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { GoogleStrategy } from './auth/google/google.strategy';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
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
import { TwoFactorAuthenticationController } from './twoFactorAuthentication/twoFactorAuthentication.controller';
import { TwoFactorAuthenticationService } from './twoFactorAuthentication/twoFactorAuthentication.service';
import { AuthenticationService } from './twoFactorAuthentication/authentication.service';
import { GoogleAuthController } from './auth/google/googleauth.controller';
import { GoogleAuthService } from './auth/google/googleauth.service';

@Module({
  imports: [GameModule, AuthModule, TypeOrmModule.forRoot(config),

    ConfigModule.forRoot({isGlobal: true }),
   
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..')
    }),
    UserModule,
  
    TypeOrmModule.forFeature([User,Achievevement,FriendRequest]), JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '30d' },
   
  }),],
  controllers: [AppController, TestController, AuthController, UserController, TwoFactorAuthenticationController, GoogleAuthController],

  providers: [
    AppService,
    WebsockGateway,
    AuthService,
    AuthStrategy,
    GoogleStrategy,
    UserService,
    TwoFactorAuthenticationService,
    AuthenticationService,
    GoogleAuthService
  ],
})
export class AppModule {}
