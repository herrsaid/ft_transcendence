import { Module } from '@nestjs/common';
import { PingPongGateway } from './auto_match/lobbie.gateway';
import { PlayPlayer1Gateway } from './start_game/play.player1.gateway';
import { PlayPlayer2Gateway } from './start_game/play.player2.gateway';
import { GameHead } from './game_brain/logic/GameHead';
import { ScheduleModule } from '@nestjs/schedule';
import { BallGateway } from './start_game/play.ball.gateway';
import { PlaySpactatorGateway } from './Stream_mood/Stream.Stpector.gatway';
import { GameStream } from './game_brain/methods/Game_stream_attribute';
@Module({
  imports: [
    ScheduleModule.forRoot()
  ],
  controllers: [],
  providers: [PingPongGateway,PlayPlayer1Gateway,PlayPlayer2Gateway,BallGateway,GameHead,GameStream,PlaySpactatorGateway],
})
export class GameModule {}
