import { io } from 'socket.io-client';

const url:string = process.env.NEXT_PUBLIC_IP + ":1339";

export const socket = io(url, {extraHeaders:{
        'Access-Control-Allow-Origin': "*"
    }});
