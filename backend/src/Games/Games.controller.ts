import { Controller, Get } from '@nestjs/common';

@Controller()
export class GamesController {
  @Get('Games')
  GetGameName(): string {
    return 'hello from GamesController';
  }
}
