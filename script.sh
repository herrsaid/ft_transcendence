# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    script.sh                                          :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2023/08/02 10:24:50 by mabdelou          #+#    #+#              #
#    Updated: 2023/08/02 10:47:36 by mabdelou         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

#!/bin/bash

MachineLine=$(ifconfig | grep 10.11 | awk '{printf $2}')
FileIPath="$HOME/goinfre/ft_transcendence/Frontend/app/Game/Online/Socket/auto_match_socket.ts"
FileIIPath="$HOME/goinfre/ft_transcendence/Frontend/app/Game/Online/Socket/start_game_socket.ts"

if [ -d "$HOME/goinfre/ft_transcendence" ]; then
cat << EDF > $FileIPath
import { io } from 'socket.io-client';

EDF
echo "export const socket = io('http://$MachineLine:1339', {extraHeaders:{" >> $FileIPath
cat << EDF >> $FileIPath
        'Access-Control-Allow-Origin': "*"
    }});
EDF


cat << EDF > $FileIIPath
import { io } from 'socket.io-client';

EDF
echo "export const player1 = io('http://$MachineLine:1340', {extraHeaders:{" >> $FileIIPath
cat << EDF >> $FileIIPath
        'Access-Control-Allow-Origin': "*"
    }});
EDF
echo "export const player2 = io('http://$MachineLine:1341', {extraHeaders:{" >> $FileIIPath
cat << EDF >> $FileIIPath
        'Access-Control-Allow-Origin': "*"
    }});
EDF
cd $HOME/goinfre/ft_transcendence/
eval cd Frontend/ ; npm i ; npm run dev > 1; cd ..
eval cd backend/ ; npm i ; npm run start:dev > 2 ; cd ..
echo "done!"
else
cd $HOME/goinfre/ ; git clone git@github.com:herrsaid/ft_transcendence.git
cd ft_transcendence/Frontend/ ; npm i ; eval npm run dev > ../1 ; cd ..
cd ft_transcendence/backend/ ; npm i ; eval npm run start:dev > ../2; cd ..
cat << EDF > $FileIPath
import { io } from 'socket.io-client';

EDF
echo "export const socket = io('http://$MachineLine:1339', {extraHeaders:{" >> $FileIPath
cat << EDF >> $FileIPath
        'Access-Control-Allow-Origin': "*"
    }});
EDF
cat << EDF > $FileIIPath
import { io } from 'socket.io-client';

EDF
echo "export const player1 = io('http://$MachineLine:1340', {extraHeaders:{" >> $FileIIPath
cat << EDF >> $FileIIPath
        'Access-Control-Allow-Origin': "*"
    }});
EDF
echo "export const player2 = io('http://$MachineLine:1341', {extraHeaders:{" >> $FileIIPath
cat << EDF >> $FileIIPath
        'Access-Control-Allow-Origin': "*"
    }});
EDF
echo "creating repo directory && done!"
fi