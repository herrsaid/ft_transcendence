/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   players_attribute.ts                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 10:26:50 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/02 10:26:51 by mabdelou         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from "@nestjs/common";
import { Socket } from 'socket.io';

@Injectable()
export class PlayersAttribute
{
    //attributes
    public Result1Val: number;
    public Result2Val: number;
    public Player1ID: string;
    public Player2ID: string;
    public Player1UserName: string;
    public Player2UserName: string;
    public Player1Client: Socket | undefined;
    public Player2Client: Socket | undefined;

    constructor()
    {
        this.Result1Val = 0;
        this.Result2Val = 0;
        this.Player1ID = '';
        this.Player2ID = '';
        this.Player1UserName = '';
        this.Player2UserName = '';
        this.Player1Client = undefined;
        this.Player2Client = undefined;
    }
}
