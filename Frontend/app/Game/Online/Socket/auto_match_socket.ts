import { io } from 'socket.io-client';

const URL:string = process.env.AUTO_MATCH_SOCKET!;

export const socket = io(URL, {extraHeaders:{
        'Access-Control-Allow-Origin': "*"
    }});
