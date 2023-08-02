# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2023/08/02 10:17:46 by mabdelou          #+#    #+#              #
#    Updated: 2023/08/02 18:47:04 by mabdelou         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

all:
	docker-compose -f ./docker-compose.yml up
	
status:
	docker-compose -f ./docker-compose.yml ps
stop:
	docker-compose -f ./docker-compose.yml stop
start:
	docker-compose -f ./docker-compose.yml start
	