'use client'

/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   page.tsx                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 10:25:32 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/02 10:25:33 by mabdelou         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Game from './Game';
import './Game.css'
const page = () => 
{
    return(
        <div className='Game'>
            <Game/>
        </div>
    );
}

export default page;