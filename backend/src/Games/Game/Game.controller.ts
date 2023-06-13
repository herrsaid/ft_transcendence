import { Controller, Get, Post, Delete, Patch, Param } from '@nestjs/common';

@Controller('Games')
export class GameController {
  @Get(':gamename')
  GetGameName(@Param('gamename') gamename: string): string {
    if (
      gamename != 'PingPong' &&
      gamename != 'Chess' &&
      gamename != 'CardGames'
    )
      return `there is no game in our website  have that name "${gamename}"`;
    return `hello from GameControler the game is ${gamename}`;
  }
}
