import { io } from 'socket.io-client'

export const socket = io('http://10.11.7.1:1339', {extraHeaders:{
            'Access-Control-Allow-Origin': "*"
        }});

