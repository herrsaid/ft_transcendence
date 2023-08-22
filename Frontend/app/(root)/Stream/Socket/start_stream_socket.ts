import { io } from 'socket.io-client';

export const stream = io('http://10.13.10.5:1342', {extraHeaders:{
        'Access-Control-Allow-Origin': "*"
    }});
