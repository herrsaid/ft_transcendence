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

import Game from './Component/Game';
import { useRouter } from 'next/navigation'
import './Game.css'
const page = () => 
{
    const router = useRouter();
    return(
        <div id='Game'>
            <Game router={router}/>
        </div>
    );
}

export default page;