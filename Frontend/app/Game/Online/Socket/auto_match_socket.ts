/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   auto_match_socket.ts                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 18:39:11 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/02 18:39:12 by mabdelou         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { io } from 'socket.io-client';

const URL:string = process.env.AUTO_MATCH_SOCKET!;

export const socket = io(URL, {extraHeaders:{
        'Access-Control-Allow-Origin': "*"
    }});
