/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   start_game_socket.ts                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 18:39:14 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/02 18:39:15 by mabdelou         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { io } from 'socket.io-client';
const URL:string = process.env.GAME_PLAYER_I_SOCKET!;
const URL2:string = process.env.GAME_PLAYER_II_SOCKET!;
export const player1 = io(URL, {extraHeaders:{
        'Access-Control-Allow-Origin': "*"
    }});
export const player2 = io(URL2, {extraHeaders:{
        'Access-Control-Allow-Origin': "*"
    }});
