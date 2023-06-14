import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { GameEtity } from './Game.Entity';
@Controller('Games')
export class GameController {
  Game: GameEtity[] = [];
  @Get()
  @HttpCode(HttpStatus.OK)
  GetAllGames(): GameEtity[] {
    return this.Game;
  }
  @Get(':gamename')
  @HttpCode(HttpStatus.OK)
  GetGame(@Param('gamename') gamename: string): string {
    const ret = this.Game.find((game) => game.gamename === gamename);
    if (ret === undefined) return `can't GetGame: this game not found`;
    return `gamename is ${ret.gamename}\n gameid is ${ret.id}\n gamestatus is ${ret.status}`;
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  CreateGame(@Body() body: GameEtity): string {
    if (this.Game.find((game) => game.id === body.id)) return 'id alredy exist';
    else if (this.Game.find((game) => game.gamename === body.gamename))
      return 'gamename alredy exist';
    this.Game.push(body);
    return 'game created successfully';
  }
  @Patch(':gamename')
  @HttpCode(HttpStatus.OK)
  UpdateGame(
    @Param('gamename') gamename: string,
    @Body() body: GameEtity,
  ): string {
    const index = this.Game.findIndex((game) => game.gamename === gamename);
    console.log(body);
    if (this.Game[index] === undefined)
      return `can't UpdatGame: this game not found`;
    else if (this.Game.find((game) => game.id === body.id))
      return 'id alredy exist';
    else if (this.Game.find((game) => game.gamename === body.gamename))
      return 'gamename alredy exist';
    /* ex 1 */
    this.Game[index] = { ...this.Game[index], ...body };
    /* ex 2 */
    // this.Game[index] = body;
    /* ex 3 */
    // this.Game[index].id = body.id;
    // this.Game[index].gamename = body.gamename;
    // this.Game[index].status = body.status;

    return 'game Update successfully';
  }
  @Delete(':gamename')
  @HttpCode(HttpStatus.NO_CONTENT)
  RemoveGame(@Param('gamename') gamename: string): string {
    this.Game = this.Game.filter((game) => game.gamename !== gamename);
    return 'game Removed successfully';
  }
}
