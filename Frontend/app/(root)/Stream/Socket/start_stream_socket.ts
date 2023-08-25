import { io } from 'socket.io-client';

export const stream = io('http://192.168.1.6:1342', {extraHeaders:{
        'Access-Control-Allow-Origin': "*"
    }});
