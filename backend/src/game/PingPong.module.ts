/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   PingPong.module.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 10:27:16 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/06 17:01:04 by mabdelou         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Module } from '@nestjs/common';
import { PingPongGateway } from './auto_match/lobbie.gateway';
import { PlayPlayer1Gateway } from './start_game/play.player1.gateway';
import { PlayPlayer2Gateway } from './start_game/play.player2.gateway';
import { GameLogic } from './game_brain/logic/game_server_logic';
import { PlaySpactatorGateway } from './Stream_mood/Stream.Stpector.gatway';
import { GameStreamAttribute } from './game_brain/methods/Game_stream_attribute';
import { HistoryManager } from './data_manager/HistoryManager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/guard/constants';
import { GameArchievement, GameUserInfo, History } from './PingPong.Entity';
import { BallGateway } from './start_game/play.ball.gateway';
import { ScheduleModule } from '@nestjs/schedule';
import { GameInfoManager } from './data_manager/GameInfoManager';
import { ArchievementManager } from './data_manager/ArchievementManager';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client')
    }),
  
    TypeOrmModule.forFeature([History,GameUserInfo,GameArchievement]), JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '30d' },
   
  }),],
  controllers: [],
  providers: [
    PingPongGateway,
    PlayPlayer1Gateway,
    PlayPlayer2Gateway,
    GameLogic,
    BallGateway,
    GameStreamAttribute,
    PlaySpactatorGateway,
    HistoryManager,
    GameInfoManager,
    ArchievementManager
  ],
})
export class GameModule {}
