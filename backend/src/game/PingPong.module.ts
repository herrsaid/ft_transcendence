import { Module } from '@nestjs/common';
import { PingPongGateway } from './auto_match/lobbie.gateway';
@Module({
  imports: [],
  controllers: [],
  providers: [PingPongGateway,],
})
export class GameModule {}
