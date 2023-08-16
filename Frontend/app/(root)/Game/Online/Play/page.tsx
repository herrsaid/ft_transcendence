'use client'

/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   page.tsx                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 10:25:51 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/02 10:25:52 by mabdelou         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Game from './Game';
import './Game.css'
const page = () => 
{
    return(
        <div id='Game'>
            <Game/>
        </div>
    );
}

export default page;