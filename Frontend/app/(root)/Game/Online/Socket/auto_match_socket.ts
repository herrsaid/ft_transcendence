import { io } from 'socket.io-client';
export const socket = io('http://:1339', {extraHeaders:{
        'Access-Control-Allow-Origin': "*"
    }});
