/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   RoomClass.ts                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/03 08:59:47 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/03 17:12:07 by mabdelou         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from "@nestjs/common";
import { Socket } from 'socket.io';
import { PlayerClass } from "./PlayerClass";

@Injectable()
export class RoomClass{
    //attributes
    public players: PlayerClass[]
    public Speed: number;
    public Points: number;
    public RoomMood: boolean;

    constructor()
    {
        this.players = [];
        this.Speed = 0;
        this.Points = 0;
        this.RoomMood = false;
    }
}
