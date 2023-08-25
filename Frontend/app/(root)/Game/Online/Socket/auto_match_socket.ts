import { io } from 'socket.io-client';
export const socket = io('http://192.168.1.6:1339', {extraHeaders:{
        'Access-Control-Allow-Origin': "*"
    }});
