/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   start_game_socket.ts                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 18:39:14 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/05 10:26:11 by mabdelou         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { io } from 'socket.io-client';

const URL:string = "http://10.11.13.7:1340";
const URL2:string = "http://10.11.13.7:1341";
    export const player1 = io(URL, {extraHeaders:{
            'Access-Control-Allow-Origin': "*"
        }}); 
export const player2 = io(URL2, {extraHeaders:{
        'Access-Control-Allow-Origin': "*"
    }});
