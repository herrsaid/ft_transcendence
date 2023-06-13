import { Module } from '@nestjs/common';
import { GamesController } from './Games.controller';
import { GamesService } from './Games.servicce';
import { GameModule } from './Game/Game.module';
@Module({
  imports: [GameModule],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
