'use client'

import { player1 } from '../PingPong/Socket/start_game_socket'
import { player2 } from '../PingPong/Socket/start_game_socket'
const handlemouseclick = () => {
  if(player1 !== undefined)
    player1.emit('conection_closed');
  if(player2 !== undefined)
    player2.emit('conection_closed');
  }
export default function Icon(props: any)
{
  const handlemouseenter = (event: any) => {
    const buttonRect = event.target.getBoundingClientRect();
    const xstart=  buttonRect.left;
    const xend= (buttonRect.left+buttonRect.width);
    props.setTargetX({start: xstart,end: xend});
  };
  return(
    <div id={props.idd}>
        <button  onMouseEnter={handlemouseenter} onClick={handlemouseclick}>
          {props.title}
        </button>
      </div>
      );
}
