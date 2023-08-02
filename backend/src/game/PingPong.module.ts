/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   PingPong.module.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 10:27:16 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/02 10:27:17 by mabdelou         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Module } from '@nestjs/common';
import { PingPongGateway } from './auto_match/lobbie.gateway';
import { PlayPlayer1Gateway } from './start_game/play.player1.gateway';
import { PlayPlayer2Gateway } from './start_game/play.player2.gateway';
import { GameLogic } from './game_brain/logic/game_server_logic';
import { ScheduleModule } from '@nestjs/schedule';
import { BallGateway } from './start_game/play.ball.gateway';
import { PlaySpactatorGateway } from './Stream_mood/Stream.Stpector.gatway';
import { GameStreamAttribute } from './game_brain/methods/Game_stream_attribute';
@Module({
  imports: [
    ScheduleModule.forRoot()
  ],
  controllers: [],
  providers: [PingPongGateway,PlayPlayer1Gateway,PlayPlayer2Gateway,BallGateway,GameLogic,GameStreamAttribute,PlaySpactatorGateway],
})
export class GameModule {}
