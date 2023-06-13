import { Controller, Get } from '@nestjs/common';

@Controller()
export class GamesController {
  @Get('Games')
  newhello(): string {
    return 'hello from GamesController';
  }
}
