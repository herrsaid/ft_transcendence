import { io } from 'socket.io-client';

export const stream = io('http://:1342', {extraHeaders:{
        'Access-Control-Allow-Origin': "*"
    }});
