# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    script.sh                                          :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2023/08/02 10:24:50 by mabdelou          #+#    #+#              #
#    Updated: 2023/08/14 14:27:58 by mabdelou         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

#!/bin/bash

MachineLine=$(ifconfig | grep 10.11 | awk '{printf $2}')
if [ -d "$HOME/Desktop/ft_transcendence" ]; then
	FileIPath="$HOME/Desktop/ft_transcendence/Frontend/app/(root)/Game/Online/Socket/auto_match_socket.ts"
FileIIPath="$HOME/Desktop/ft_transcendence/Frontend/app/(root)/Game/Online/Socket/start_game_socket.ts"
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
echo "done!"
else
cd $HOME/Desktop/ ; git clone git@github.com:herrsaid/ft_transcendence.git
FileIPath="$HOME/Desktop/ft_transcendence/Frontend/app/(root)/Game/Online/Socket/auto_match_socket.ts"
FileIIPath="$HOME/Desktop/ft_transcendence/Frontend/app/(root)/Game/Online/Socket/start_game_socket.ts"
echo "create repo directory && update .envfile"
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
echo "done!"
fi

[ `uname -s` != "Darwin" ] && return

if [ -d "/nfs/homes/mabdelou/.local/share/applications/code"]; then
/nfs/homes/mabdelou/.local/share/applications/code/code ~/Desktop/ft_transcendence
fi
gnome-terminal --tab --command="zsh -c 'cd $Home/Desktop/ft_transcendence/Frontend ; npm i ; npm run dev'"
gnome-terminal --tab --command="zsh -c 'cd $Home/Desktop/ft_transcendence/backend ;npm i ; sleep 90; npm start:run dev'"
gnome-terminal --tab --cpmmand="zsh -c 'cd $Home/Desktop/ft_transcendence'; docker-compose up"
exit
