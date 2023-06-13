import { Module } from '@nestjs/common';
import { GamesController } from './Games.controller';
import { GamesService } from './Games.servicce';
@Module({
  imports: [],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
