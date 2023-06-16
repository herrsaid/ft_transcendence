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

@Module({
  imports: [GamesModule, AuthModule],
  controllers: [AppController, TestController, AuthController],
  providers: [AppService, WebsockGateway, AuthService, AuthStrategy],
})
export class AppModule {}
