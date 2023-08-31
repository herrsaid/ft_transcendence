import { io } from 'socket.io-client';
export const socket = io('http://10.14.5.2:1339', {extraHeaders:{
        'Access-Control-Allow-Origin': "*"
    }});
