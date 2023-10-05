/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   Game_stream_attribute.ts                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 10:26:46 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/02 10:26:47 by mabdelou         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from "@nestjs/common";
import { Socket } from 'socket.io';



@Injectable()

export class GameStreamAttribute
{
    //attributes
    public SpectatorID: string;
    public SpectatorUser: string;
    public SpectatorSocket: Socket| undefined;

    constructor()
    {
        this.SpectatorID = '';
        this.SpectatorUser = '';
        this.SpectatorSocket = undefined;
    }
}
