import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestController } from './test/test.controller';
import { WebsockGateway } from './websock/websock.gateway';
import { GamesModule } from './learn/Games.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { AuthStrategy } from './auth/auth.strategy';
import { AuthController } from './auth/auth.controller';
import { PingPongGateway } from './learn/Game/PingPong/PingPong.Gateway';
import { PlayGateway } from './learn/Game/PingPong/Play.Gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { GoogleStrategy } from './google.strategy';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';

@Module({
  imports: [GamesModule, AuthModule, TypeOrmModule.forRoot(config), UserModule, TypeOrmModule.forFeature([User]), JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '15m' },
  }),],
  controllers: [AppController, TestController, AuthController, UserController],

  providers: [
    AppService,
    WebsockGateway,
    AuthService,
    AuthStrategy,
    PingPongGateway,
    PlayGateway,
    GoogleStrategy,
    UserService
  ],
})
export class AppModule {}
