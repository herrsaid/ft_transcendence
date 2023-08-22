/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   PingPong.Entity.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 10:27:14 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/13 17:56:28 by mabdelou         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import {IsBoolean, IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  @IsString()
  myimage: string | null;
  @IsString()
  InputValue: string | null;
}

export class UserInfo {
  @IsNumber()
  @IsNotEmpty()
  RoomNumber: number;
  @IsString()
  Username: string | null;
  @IsString()
  myimage: string | null;
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

@Entity({name: 'history'})
export class History 
{
  @PrimaryGeneratedColumn()
    key: number;
  
  @Column()
    myuserid: number
  @Column()
  enemmyuserid: number
  @Column()
    myresult: number
  @Column()
    enemmyresult: number
  @Column()
    score: number
  @Column()
    rank: number
  
}

@Entity({name: 'game_user_info'})
export class GameUserInfo 
{
  @PrimaryGeneratedColumn()
    key: number;
  @Column()
    rank: number
  @Column()
    userid: number
  @Column()
    totalgames: number
  @Column()
    totalwins: number
  @Column()
    totalosses: number
  @Column()
    totalarchievements: number
}

@Entity({name: 'game_archievement'})
export class GameArchievement 
{
  @PrimaryGeneratedColumn()
    key: number;
  
  @Column()
    userid: number
  @Column({
    length: 100,
  })
    archievement_name: string
}