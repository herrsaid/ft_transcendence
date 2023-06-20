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
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [GamesModule, AuthModule, TypeOrmModule.forRoot(config)],
  controllers: [AppController, TestController, AuthController],
  providers: [AppService, WebsockGateway, AuthService, AuthStrategy, GoogleStrategy],
})
export class AppModule {}
