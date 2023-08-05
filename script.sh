# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    script.sh                                          :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2023/08/02 10:24:50 by mabdelou          #+#    #+#              #
#    Updated: 2023/08/05 21:22:01 by mabdelou         ###   ########.fr        #
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
echo "done!"
else
cd $HOME/goinfre/ ; git clone git@github.com:herrsaid/ft_transcendence.git
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
open -a "Visual Studio Code" $HOME/goinfre/ft_transcendence
osascript << EDF &>/dev/null
--run Docker Aplication

	tell application "Docker"
	    activate
	end tell

tell application "iTerm 2.app"
	--Create first initial window

	    create window with default profile

    --Create secound initial window

	    create window with default profile

	--Send a command to the first session

        tell session 1 of tab 1 of  window 1
            write text "cd $HOME/goinfre/ft_transcendence/Frontend ; npm i ; npm run dev"
        end tell

	--Send a command to the secound session

        tell session 1 of tab 1 of  window 2
            write text "sleep 90; cd $HOME/goinfre/ft_transcendence/backend ; npm i ; npm run start:dev"
        end tell

	--Select the first tab

	tell session 1
		select
	end tell
end tell

EDF
exit
