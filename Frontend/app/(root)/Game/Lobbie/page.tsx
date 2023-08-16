'use client'

/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   page.tsx                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 10:25:21 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/03 10:31:36 by mabdelou         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import './Rooms/Rooms.css'
import Rooms from './Rooms/Rooms';
const page = () => 
{
    return(
        <div id='Game'>
            <Rooms/>
        </div>
    );
}

export default page;