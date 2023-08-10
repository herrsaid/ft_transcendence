import { io } from 'socket.io-client';
export const socket = io('http://10.12.3.7:1339', {extraHeaders:{
        'Access-Control-Allow-Origin': "*"
    }});
