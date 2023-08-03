/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   PingPong.Entity.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 10:27:14 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/03 15:33:43 by mabdelou         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import {IsBoolean, IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class RoomSettingsEntity {
  @IsNumber()
  @IsNotEmpty()
  Speed: number;
  @IsNumber()
  @IsNotEmpty()
  Points: number;
  @IsBoolean()
  RoomMood: boolean;
  @IsString()
  myusername: string | null;
}

export class UserInfo {
  @IsNumber()
  @IsNotEmpty()
  RoomNumber: number;
  @IsString()
  Username: string | null;
}

export class PingPongGamePlayEntity {
  @IsNumber()
  @IsNotEmpty()
  ping1ypos: number;
  @IsNumber()
  @IsNotEmpty()
  ballypos: number;
  @IsNumber()
  @IsNotEmpty()
  ballxpos: number;
  @IsNumber()
  @IsNotEmpty()
  rlt1: number;
  @IsNumber()
  @IsNotEmpty()
  rlt2: number;
  @IsString()
  @IsNotEmpty()
  ID?: string;
  @IsObject()
  // @IsNumber()
  obj: RoomSettingsEntity;
}
