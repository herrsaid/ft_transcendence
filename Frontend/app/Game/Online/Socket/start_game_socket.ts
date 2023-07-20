import { io } from 'socket.io-client'
import { Socket } from "dgram";

export const player1 = io('http://10.11.8.4:1340', {extraHeaders:{
	'Access-Control-Allow-Origin': "*"
}});
export const player2 = io('http://10.11.8.4:1341', {extraHeaders:{
	'Access-Control-Allow-Origin': "*"
}});