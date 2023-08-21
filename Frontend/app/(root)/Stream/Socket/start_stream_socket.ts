import { io } from 'socket.io-client';

export const stream = io('http://10.13.8.5:1342', {extraHeaders:{
        'Access-Control-Allow-Origin': "*"
    }});
