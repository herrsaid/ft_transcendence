import { io } from 'socket.io-client'

export const player1 = io('http://10.11.1.5:1340', {extraHeaders:{
	'Access-Control-Allow-Origin': "*"
}});
export const player2 = io('http://10.11.1.5:1341', {extraHeaders:{
	'Access-Control-Allow-Origin': "*"
}});