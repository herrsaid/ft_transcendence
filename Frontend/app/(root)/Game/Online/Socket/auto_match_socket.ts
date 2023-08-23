import { io } from 'socket.io-client';
export const socket = io('http://10.13.10.2:1339', {extraHeaders:{
        'Access-Control-Allow-Origin': "*"
    }});
