import { io } from 'socket.io-client';
const URL:string = process.env.GAME_PLAYER_I_SOCKET!;
const URL2:string = process.env.GAME_PLAYER_II_SOCKET!;
export const player1 = io(URL, {extraHeaders:{
        'Access-Control-Allow-Origin': "*"
    }});
export const player2 = io(URL2, {extraHeaders:{
        'Access-Control-Allow-Origin': "*"
    }});
