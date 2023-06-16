import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestController } from './test/test.controller';
import { WebsockGateway } from './websock/websock.gateway';
import { GamesModule } from './learn/Games.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [GamesModule, AuthModule],
  controllers: [AppController, TestController],
  providers: [AppService, WebsockGateway, AuthService],
})
export class AppModule {}
