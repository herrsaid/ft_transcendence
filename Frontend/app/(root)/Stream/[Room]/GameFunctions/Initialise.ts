import p5 from 'p5';
import { StreamData } from '../Stream';
import { stream } from '../../Socket/start_stream_socket';
import { StreamContextType } from '../../StreamContext/StreamContext';


export function first_conection(StreamContext:StreamContextType)
{
  try
  {
    if(StreamData.first_conection_val === false)
    {
      StreamData.first_conection_val = true;
      stream.emit("new_spectator",{RoomNumber: StreamContext.StreamInfo.RoomNumber});
    }
  }
  catch{}
}

export function NewValue(p5:p5)
{
  try
  {
    if (typeof window === "undefined")
      return;
    let canvas:p5.Element| null = null;
    let w:number = Math.floor(window.innerWidth) ;
    let h:number = Math.floor(window.innerWidth/2);
    if(document.getElementById('sketch-container'))
      canvas = p5.createCanvas(StreamData.GameWidth, StreamData.GameHeight).parent('sketch-container');
    if((w !== StreamData.GameWidth || h !== StreamData.GameHeight) && window.innerWidth < 1080)
    {
      StreamData.BallXpos = Math.floor(((StreamData.BallXpos*100)/StreamData.GameWidth)*(w/100));
      StreamData.BallYpos = Math.floor(((StreamData.BallYpos*100)/StreamData.GameHeight)*(h/100));
      StreamData.Racket1Ypos = Math.floor(((StreamData.Racket1Ypos*100)/StreamData.GameHeight)*(h/100));
      StreamData.Racket2Ypos = Math.floor(((StreamData.Racket2Ypos*100)/StreamData.GameHeight)*(h/100));
      StreamData.GameWidth = w;
      StreamData.GameHeight =  h;
      StreamData.BallWidth = Math.floor(StreamData.GameWidth/52);
      StreamData.BallHeight = Math.floor(StreamData.GameHeight/26);
      StreamData.Racket1Width = Math.floor(StreamData.GameWidth/80);
      StreamData.Racket1Height = Math.floor(StreamData.GameHeight/6);
      StreamData.Racket1Xpos = Math.floor(StreamData.GameWidth/160);
      StreamData.Racket2Width = Math.floor(StreamData.GameWidth/80);
      StreamData.Racket2Height = Math.floor(StreamData.GameHeight/6);
      StreamData.Racket2Xpos = Math.floor(StreamData.GameWidth-((StreamData.GameWidth/80)+(StreamData.GameWidth/160)));
      if(document.getElementById('sketch-container'))
        p5.createCanvas(StreamData.GameWidth, StreamData.GameHeight)
          .parent('sketch-container')
          .position((window.innerWidth-StreamData.GameWidth)/2,StreamData.GameHeight/4,'absolute');
      p5.background("#090533");
    }
    else if (window.innerWidth >= 1080)
    {
      StreamData.GameWidth = Math.floor(1080);
      StreamData.GameHeight =  Math.floor(540);
      StreamData.BallWidth = Math.floor(StreamData.GameWidth/52);
      StreamData.BallHeight = Math.floor(StreamData.GameHeight/26);
      StreamData.Racket1Width = Math.floor(StreamData.GameWidth/80);
      StreamData.Racket1Height = Math.floor(StreamData.GameHeight/6);
      StreamData.Racket1Xpos = Math.floor(StreamData.GameWidth/160);
      StreamData.Racket2Width = Math.floor(StreamData.GameWidth/80);
      StreamData.Racket2Height = Math.floor(StreamData.GameHeight/6);
      StreamData.Racket2Xpos = Math.floor(StreamData.GameWidth-((StreamData.GameWidth/80)+(StreamData.GameWidth/160)));
      if(document.getElementById('sketch-container'))
        p5.createCanvas(StreamData.GameWidth, StreamData.GameHeight).parent('sketch-container').position((window.innerWidth-StreamData.GameWidth)/2,StreamData.GameHeight/4,'absolute');
      p5.background("#090533");
    }
    if(canvas)
      canvas.position((window.innerWidth-StreamData.GameWidth)/2,StreamData.GameHeight/4,'absolute');
  }
  catch{}
}