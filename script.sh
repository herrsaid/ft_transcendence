# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    script.sh                                          :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2023/08/02 10:24:50 by mabdelou          #+#    #+#              #
#    Updated: 2023/08/05 10:21:54 by mabdelou         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

#!/bin/bash

MachineLine=$(ifconfig | grep 10.11 | awk '{printf $2}')
FrontendEnvIPath="$HOME/goinfre/ft_transcendence/Frontend/.env.local"
BackendEnvIPath="$HOME/goinfre/ft_transcendence/backend/.env"
if [ -d "$HOME/goinfre/ft_transcendence" ]; then
echo "updating .env"
# cat << EDF > $FrontendEnvIPath
# SOCKET_URL=http://$MachineLine:3030
# NEXT_PUBLIC_SOCKET=http://$MachineLine:3030
# NEXT_PUBLIC_BACK_IP=http://$MachineLine:1337
# NEXT_PUBLIC_BACK_IP_G=http://$MachineLine:1337
# AUTO_MATCH_SOCKET=http://$MachineLine:1339
# GAME_PLAYER_I_SOCKET=http://$MachineLine:1340
# GAME_PLAYER_II_SOCKET=http://$MachineLine:1341
# EDF
# cat << EDF > $BackendEnvIPath
# DATABASE_NAME="testDB"
# DATABASE_HOST="localhost"
# DATABASE_USERNAME="postgres"
# DATABASE_PASSWORD="postgres"
# FRONT_IP=http://$MachineLine:3000
# CLIENT_ID=601566209551-rrmmg509qmjtgrmmgei05kqs9a2jjs6j.apps.googleusercontent.com
# CLIENT_SECRET=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
# CLIENT_ID_42=u-s4t2ud-c23c837b8aa6b7a4f906cc1ec6663ee2f70ab478c53bd43763996d7c479c8d26
# CLIENT_SECRET_42=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
# TWO_FACTOR_AUTHENTICATION_APP_NAME=ft_trand
# JWT_ACCESS_TOKEN_SECRET=complexkey3884-asgfgsd,s33003400mmdma-434-4das111!!!!!+++
# JWT_ACCESS_TOKEN_EXPIRATION_TIME=30
# INTRA_CALL_BACK=http://$MachineLine/auth/42/callback
# EDF
# echo "done!"
else
cd $HOME/goinfre/ ; git clone git@github.com:herrsaid/ft_transcendence.git
echo "create repo directory && update .envfile"
# cat << EDF > $FrontendEnvIPath
# SOCKET_URL=http://$MachineLine:3030
# NEXT_PUBLIC_SOCKET=http://$MachineLine:3030
# NEXT_PUBLIC_BACK_IP=http://$MachineLine:1337
# NEXT_PUBLIC_BACK_IP_G=http://$MachineLine:1337
# AUTO_MATCH_SOCKET=http://$MachineLine:1339
# GAME_PLAYER_I_SOCKET=http://$MachineLine:1340
# GAME_PLAYER_II_SOCKET=http://$MachineLine:1341
# EDF
# cat << EDF > $BackendEnvIPath
# DATABASE_NAME="testDB"
# DATABASE_HOST="localhost"
# DATABASE_USERNAME="postgres"
# DATABASE_PASSWORD="postgres"
# FRONT_IP=http://$MachineLine:3000
# CLIENT_ID=601566209551-rrmmg509qmjtgrmmgei05kqs9a2jjs6j.apps.googleusercontent.com
# CLIENT_SECRET=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
# CLIENT_ID_42=u-s4t2ud-c23c837b8aa6b7a4f906cc1ec6663ee2f70ab478c53bd43763996d7c479c8d26
# CLIENT_SECRET_42=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
# TWO_FACTOR_AUTHENTICATION_APP_NAME=ft_trand
# JWT_ACCESS_TOKEN_SECRET=complexkey3884-asgfgsd,s33003400mmdma-434-4das111!!!!!+++
# JWT_ACCESS_TOKEN_EXPIRATION_TIME=30
# INTRA_CALL_BACK=http://$MachineLine/auth/42/callback
# EDF
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