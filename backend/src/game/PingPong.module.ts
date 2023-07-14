import { Module } from '@nestjs/common';
import { PingPongGateway } from './auto_match/lobbie.gateway';
import { PlayPlayer1Gateway } from './start_game/play.player1.gateway';
import { PlayPlayer2Gateway } from './start_game/play.player2.gateway';
@Module({
  imports: [],
  controllers: [],
  providers: [PingPongGateway,PlayPlayer1Gateway,PlayPlayer2Gateway],
})
export class GameModule {}
