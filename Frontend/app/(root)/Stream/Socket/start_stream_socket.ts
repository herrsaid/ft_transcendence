import { io } from 'socket.io-client';

const url:string = process.env.NEXT_PUBLIC_IP + ":1342";

export const stream = io(url, {extraHeaders:{
        'Access-Control-Allow-Origin': "*"
    }});
