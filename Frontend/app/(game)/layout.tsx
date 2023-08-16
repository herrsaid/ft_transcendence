'use client'

import './../(root)/globals.css'
import {useState } from 'react';
import GameInfoContext,{GameInfoType,GameInfoStateType,GetGameInfoContext} from '../(game)/Game/GameContext/GameContext';

const metadata = {
  title: '42PONG/login',
  description: 'PingPong Game 2023',
  viewport: 'width=device-width, initial-scale=1.0',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [GameInfo,SetGameInfo] = useState<GameInfoType>(
    {
        Points: 10,
        Speed: 4,
        pause_game: 0,
        RoomMood: true,
        other_tools: 0,
        host: false,
        Online: 1,
        Access:0,
        myusername: "Player I",
        enemmyusername: "Player II",
        myimage: "/2.jpg",
        enemmyimage: "/3.jpg",
    });
  return (
    
    <html lang="en">
      <body>
        <GameInfoContext.Provider value={{ GameInfo,SetGameInfo }}>
          {children}
        </GameInfoContext.Provider>
      </body>
    </html>
  );
}