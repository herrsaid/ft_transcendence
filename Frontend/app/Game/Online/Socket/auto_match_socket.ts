import { io } from 'socket.io-client'
import { Socket } from "dgram";

export const socket = io('http://10.11.7.4:1339', {extraHeaders:{
            'Access-Control-Allow-Origin': "*"
        }});

