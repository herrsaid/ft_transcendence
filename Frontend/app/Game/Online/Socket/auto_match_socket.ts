import { io } from 'socket.io-client'

export const socket = io('http://10.11.9.4:1339', {extraHeaders:{
            'Access-Control-Allow-Origin': "*"
        }});

