# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    script.sh                                          :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2023/08/02 10:24:50 by mabdelou          #+#    #+#              #
#    Updated: 2023/08/02 18:53:30 by mabdelou         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

#!/bin/bash

MachineLine=$(ifconfig | grep 10.11 | awk '{printf $2}')
EnvIPath="$HOME/goinfre/ft_transcendence/Frontend/.env.local"

if [ -d "$HOME/goinfre/ft_transcendence" ]; then
echo "updating .env"
cat << EDF > $EnvIPath
SOCKET_URL=http://$MachineLine:3030
NEXT_PUBLIC_SOCKET=http://$MachineLine:3030
NEXT_PUBLIC_BACK_IP=http://$MachineLine:1337
NEXT_PUBLIC_BACK_IP_G=http://$MachineLine:1337
AUTO_MATCH_SOCKET=http://$MachineLine:1339
GAME_PLAYER_I_SOCKET=http://$MachineLine:1340
GAME_PLAYER_II_SOCKET=http://$MachineLine:1341
EDF
echo "done!"
else
cd $HOME/goinfre/ ; git clone git@github.com:herrsaid/ft_transcendence.git
echo "create repo directory && update .envfile"
cat << EDF > $EnvIPath
SOCKET_URL=http://$MachineLine:3030
NEXT_PUBLIC_SOCKET=http://$MachineLine:3030
NEXT_PUBLIC_BACK_IP=http://$MachineLine:1337
NEXT_PUBLIC_BACK_IP_G=http://$MachineLine:1337
AUTO_MATCH_SOCKET=http://$MachineLine:1339
GAME_PLAYER_I_SOCKET=http://$MachineLine:1340
GAME_PLAYER_II_SOCKET=http://$MachineLine:1341
EDF
echo "done!"
fi

[ `uname -s` != "Darwin" ] && return

osascript << EDF
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