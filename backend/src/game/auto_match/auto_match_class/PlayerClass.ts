/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   PlayerClass.ts                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/03 09:06:23 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/03 12:56:34 by mabdelou         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from "@nestjs/common";
import { Socket } from 'socket.io';

@Injectable()
export class PlayerClass{
    //attributes
    public Player: string  | null;
    public PlayerId: string;
    public PlayerSocket: Socket | undefined;
    constructor()
    {
        this.Player = null;
        this.PlayerId = "";
        this.PlayerSocket = undefined;
    }
}
