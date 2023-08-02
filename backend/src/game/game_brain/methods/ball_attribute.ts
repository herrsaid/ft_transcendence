/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ball_attribute.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 10:26:41 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/02 10:26:42 by mabdelou         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from "@nestjs/common";
import { RoomInfo } from "./game_room_attribute";
@Injectable()
export class BallsAttribute
{
    //attributes
    public BallXpos:number;
    public BallYpos:number;
    public BallXdirection: number;
    public BallYdirection: number;
    public BallWidth: number;
    public BallHeight: number;
    constructor()
    {
        this.BallXpos = RoomInfo.GameWidth/2;
        this.BallYpos = RoomInfo.GameHeight/2;
        this.BallXdirection = 1;
        this.BallYdirection = 1;
        this.BallWidth = RoomInfo.GameWidth/32;
        this.BallHeight =  RoomInfo.GameHeight/16;
    }
}
