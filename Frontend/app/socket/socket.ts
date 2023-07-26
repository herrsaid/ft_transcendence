
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';

const URL = process.env.NEXT_PUBLIC_SOCKET;
export const socket = io(URL, {extraHeaders:{
    'Access-Control-Allow-Origin': "*",
    'Authorization': Cookies.get('access_token')
}});