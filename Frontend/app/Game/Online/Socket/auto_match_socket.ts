/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   auto_match_socket.ts                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 18:39:11 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/04 09:13:04 by mabdelou         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { io } from 'socket.io-client';

const URL:string =  "http://10.11.11.4:1339";

export const socket = io(URL, {extraHeaders:{
        'Access-Control-Allow-Origin': "*"
    }});
