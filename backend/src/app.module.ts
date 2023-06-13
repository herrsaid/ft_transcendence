import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestController } from './test/test.controller';
import { WebsockGateway } from './websock/websock.gateway';

@Module({
  imports: [],
  controllers: [AppController, TestController],
  providers: [AppService, WebsockGateway],
})
export class AppModule {}
