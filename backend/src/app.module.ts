import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestController } from './test/test.controller';
import { WebsockGateway } from './websock/websock.gateway';
import { GamesModule } from './learn/Games.module';
@Module({
  imports: [GamesModule],
  controllers: [AppController, TestController],
  providers: [AppService, WebsockGateway],
})
export class AppModule {}
