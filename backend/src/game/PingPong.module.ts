import { Module } from '@nestjs/common';
import { PingPongGateway } from './auto_match/lobbie.gateway';
import { PlayPlayer1Gateway } from './start_game/play.player1.gateway';
import { PlayPlayer2Gateway } from './start_game/play.player2.gateway';
import { GameLogic } from './game_brain/game_server_logic';
import { ScheduleModule } from '@nestjs/schedule';
import { BallGateway } from './start_game/play.ball.gateway';
@Module({
  imports: [
    ScheduleModule.forRoot()
  ],
  controllers: [],
  providers: [PingPongGateway,PlayPlayer1Gateway,PlayPlayer2Gateway,BallGateway,GameLogic],
})
export class GameModule {}
