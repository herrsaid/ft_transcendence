import { io } from 'socket.io-client';
export const player1 = io('http://10.13.7.6:1340', {extraHeaders:{
        'Access-Control-Allow-Origin': "*"
    }});
export const player2 = io('http://10.13.7.6:1341', {extraHeaders:{
        'Access-Control-Allow-Origin': "*"
    }});
