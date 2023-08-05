/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   PingPong.Entity.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 10:27:14 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/05 13:21:12 by mabdelou         ###   ########.fr       */
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

@Entity({name: 'history'})
export class History 
{
  @PrimaryGeneratedColumn()
    key: number;
  
  @Column({
    length: 50,
  })
    myusername: string
  @Column({
    length: 50,
  })
    enemmyusername: string
  @Column()
    myresult: number
  @Column()
    enemmyresult: number
  @Column()
    score: number
  @Column()
    rank: number
  
}