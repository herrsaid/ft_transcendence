import { io } from 'socket.io-client';
import Cookies from 'js-cookie';

const url:string = process.env.NEXT_PUBLIC_IP + ":1339";

export const socket = io(url, {extraHeaders:{
        'Access-Control-Allow-Origin': "*",
        'Authorization': Cookies.get('access_token')!
    }});
