import { io } from 'socket.io-client';

const url1:string = process.env.NEXT_PUBLIC_IP + ":1340";
const url2:string = process.env.NEXT_PUBLIC_IP + ":1341";

export const player1 = io(url1, {extraHeaders:{
        'Access-Control-Allow-Origin': "*"
    }});
export const player2 = io(url2, {extraHeaders:{
        'Access-Control-Allow-Origin': "*"
    }});
