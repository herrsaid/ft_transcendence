import { Module } from '@nestjs/common';
import { GameController } from './Game.controller';
import { GameService } from './Game.service';
@Module({
  imports: [],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
