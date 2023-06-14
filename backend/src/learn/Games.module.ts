import { Module } from '@nestjs/common';
import { GamesController } from './Games.controller';
import { GamesService } from './Games.servicce';
import { GameModule } from './Game/Game.module';
import { UsersModule } from './Users/Users.module';
@Module({
  imports: [GameModule, UsersModule],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
