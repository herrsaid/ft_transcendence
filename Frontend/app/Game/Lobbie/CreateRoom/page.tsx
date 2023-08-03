/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   page.tsx                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 10:25:21 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/03 08:36:52 by mabdelou         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

'use client'

import PingPongSettings from "./Settings/Settings";
import { useRouter } from 'next/navigation'
export default function Game() {
  const router = useRouter();
    return (
        <PingPongSettings router={router} />
    )
  }