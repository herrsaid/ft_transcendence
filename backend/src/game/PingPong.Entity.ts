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

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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