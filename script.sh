# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    run_project                                        :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2023/08/02 10:24:50 by mabdelou          #+#    #+#              #
#    Updated: 2023/08/14 18:54:23 by mabdelou         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

#!/bin/bash

MachineLine=$(ifconfig | grep 10.11 | awk '{printf $2}')
if [ -d "$HOME/goinfre/ft_transcendence" ]; then
	FileIPath="$HOME/goinfre/ft_transcendence/Frontend/app/(root)/Game/Online/Socket/auto_match_socket.ts"
FileIIPath="$HOME/goinfre/ft_transcendence/Frontend/app/(root)/Game/Online/Socket/start_game_socket.ts"
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
cd $HOME/goinfre/ ; git clone git@github.com:herrsaid/ft_transcendence.git
FileIPath="$HOME/goinfre/ft_transcendence/Frontend/app/(root)/Game/Online/Socket/auto_match_socket.ts"
FileIIPath="$HOME/goinfre/ft_transcendence/Frontend/app/(root)/Game/Online/Socket/start_game_socket.ts"
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


if [ -d "$HOME/.local/share/applications/code"]; then
$gnome-terminal --window --command="zsh -c 'cd $HOME ; ./.local/share/applications/code/code ; ./goinfre/ft_transcendence;'"
fi
gnome-terminal --window --command="zsh -c 'cd $HOME/goinfre/ft_transcendence/Frontend ; npm i ; npm run dev'"
gnome-terminal --window --command="zsh -c 'cd $HOME/goinfre/ft_transcendence/backend ;npm i ; sleep 90; npm start:run dev'"
gnome-terminal --window --command="zsh -c 'cd $HOME/goinfre/ft_transcendence; docker-compose up'"
exit
