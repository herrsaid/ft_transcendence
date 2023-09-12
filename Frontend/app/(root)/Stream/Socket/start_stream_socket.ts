import { io } from 'socket.io-client';

export const stream = io('http://10.14.8.6:1342', {extraHeaders:{
        'Access-Control-Allow-Origin': "*"
    }});
