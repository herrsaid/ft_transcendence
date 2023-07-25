
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';

export const socket = io('http://localhost:3030', {extraHeaders:{
    'Access-Control-Allow-Origin': "*",
    'Authorization': Cookies.get('access_token')
}});