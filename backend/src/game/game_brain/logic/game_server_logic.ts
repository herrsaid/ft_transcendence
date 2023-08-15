/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   game_server_logic.ts                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: mabdelou <mabdelou@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/08/02 10:26:38 by mabdelou          #+#    #+#             */
/*   Updated: 2023/08/07 23:43:22 by mabdelou         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from "@nestjs/common";
import { data } from "./game_server_class";
@Injectable()
export class GameLogic
{
    debug(data:data)
    {
        //display info on terminal for debuging
        console.log("------------------------------------");
        console.log("data.BallXpos: "+ data.BallInfo.BallXpos);
        console.log("data.BallYpos: "+ data.BallInfo.BallYpos);
        console.log("data.BallXdirection: "+ data.BallInfo.BallXdirection);
        console.log("data.BallYdirection: "+ data.BallInfo.BallYdirection);
        console.log("data.BallWidth: "+ data.BallInfo.BallWidth);
        console.log("data.BallHeight: "+ data.BallInfo.BallHeight);
        console.log("data.Racket1Height: "+ data.RacketsInfo.Racket1Height);
        console.log("data.Racket1Ypos: "+ data.RacketsInfo.Racket1Ypos);
        console.log("data.Racket1Width: "+ data.RacketsInfo.Racket1Width);
        console.log("data.Racket1Xpos: "+ data.RacketsInfo.Racket1Xpos);
        console.log("data.Racket2Height: "+ data.RacketsInfo.Racket2Height);
        console.log("data.Racket2Ypos: "+ data.RacketsInfo.Racket2Ypos);
        console.log("data.Racket2Width: "+ data.RacketsInfo.Racket2Width);
        console.log("data.Racket1Xpos: "+ data.RacketsInfo.Racket2Xpos);
        console.log("data.Player1ID: "+ data.PlayersInfo.Player1ID);
        console.log("data.Player2ID: "+ data.PlayersInfo.Player2ID);
        console.log("data.Player1ID: "+ data.PlayersInfo.Player1UserName);
        console.log("data.Player2ID: "+ data.PlayersInfo.Player2UserName);
        console.log("data.GameWidth "+ data.RoomInfo.GameWidth);
        console.log("data.GameHeight "+ data.RoomInfo.GameHeight);
        console.log("data.GameStatus "+ data.RoomInfo.GameStatus );
        console.log("data.GameSpeed "+ data.RoomInfo.GameSpeed );
        console.log("data.GamePoints "+ data.RoomInfo.GamePoints );
        console.log("data.Alpha "+ data.RoomInfo.Alpha);
        console.log("data.Sleep "+ data.RoomInfo.Sleep);
        console.log("------------------------------------");
    }
    CheckAlpha(data:data,BallYpos: number, RacketYpos: number, RacketHeight: number)
    {
        let ballYpos_racket: number;
        //get pos of ball on racket
        if(BallYpos > RacketYpos || BallYpos < (RacketYpos + RacketHeight))
            ballYpos_racket = BallYpos - RacketYpos;
        //if ball not in racket ballYpos_racket will be 0 and alpha will never change
        else
            ballYpos_racket = 0;
        //after get pos of ball on racket then we should  chnge it to be between 0 and 10
        let ballYpos_racket_par_10: number = Math.floor((ballYpos_racket/(RacketHeight/10)));
        // after that a chenge the result to be very closer to 10 or -10 if the ball on the first or on the last
        data.RoomInfo.Alpha = ballYpos_racket_par_10 - (10 - ballYpos_racket_par_10);
        //change Alpha value  it to int
        data.RoomInfo.Alpha = Math.floor(data.RoomInfo.Alpha);
        // - then reverse Alpha value to be very closer to 1 and -1 or if the ball on the first or on the last or very closer to 10 or if  it very closer to conter of racket
        // - if ball on the conter of racket value of Alpha will be 0
        if(data.RoomInfo.Alpha === -10|| data.RoomInfo.Alpha === 10)
            data.RoomInfo.Alpha = 9;
        if(data.RoomInfo.Alpha > 0)
            data.RoomInfo.Alpha -= 10;
        else if(data.RoomInfo.Alpha < 0)
            data.RoomInfo.Alpha += 10;
        // change movmment  of BallYdirection if ball above 5 or not
        if(ballYpos_racket_par_10 > 5)
            data.BallInfo.BallYdirection = 1;
        else
            data.BallInfo.BallYdirection = -1;
    }
    Head(data:data)
    {
        // this.debug(data);
        // allways let ball move on horizontal if BallXdirection is positive ball move right else ball move left
        data.BallInfo.BallXpos += Math.floor(data.BallInfo.BallXdirection * data.RoomInfo.GameSpeed);
        //if ballYpos not in the same Rakect2Yposenter enter this condition
        if(data.BallInfo.BallYpos < data.RacketsInfo.Racket2Ypos || data.BallInfo.BallYpos > (data.RacketsInfo.Racket2Ypos + data.RacketsInfo.Racket2Height))
        {
            // check if ball spiped racket of player2 if true then player1 get point, the ball sets to center of the game, and  the game sleep 3000 ms
            if(data.BallInfo.BallXpos > data.RoomInfo.GameWidth)
            {
                data.BallInfo.BallXdirection = -1;
                //if player1 get target of the game then gamestatus will false and the simulation will end
                if(++data.PlayersInfo.Result1Val >= data.RoomInfo.GamePoints)
                    data.RoomInfo.GameStatus = 0;
                data.BallInfo.BallXpos = Math.floor(data.RoomInfo.GameWidth/2);
                data.RoomInfo.Sleep = 100;
            }
        }
        //if ballYpos in the same Rakect2Ypos enter enter this condition
        else
        {
            //if ball hit racket then change BallXdirection to change movment direction, and check the alpha  for BallYpos
            if(data.BallInfo.BallXpos > (data.RoomInfo.GameWidth-data.BallInfo.BallWidth))
            {
                data.BallInfo.BallXdirection = -1;
                this.CheckAlpha(data,data.BallInfo.BallYpos,data.RacketsInfo.Racket2Ypos,data.RacketsInfo.Racket2Height);
            }
        }
        //if ballYpos not in the same Rakect1Yposenter enter this condition
        if(data.BallInfo.BallYpos < data.RacketsInfo.Racket1Ypos || data.BallInfo.BallYpos > (data.RacketsInfo.Racket1Ypos + data.RacketsInfo.Racket1Height))
        {

            // check if ball spiped racket of player1 if true then player2 get point, the ball sets to center of the game, and  the game sleep 3000 ms
            if(data.BallInfo.BallXpos < 0)
            {
                data.BallInfo.BallXdirection = +1;
                //if player2 get target of the game then gamestatus will false and the simulation will end
                if(++data.PlayersInfo.Result2Val >= data.RoomInfo.GamePoints)
                    data.RoomInfo.GameStatus = 0;
                data.BallInfo.BallXpos = Math.floor(data.RoomInfo.GameWidth/2);
                data.RoomInfo.Sleep = 100;
            }
        }
         //if ballYpos in the same Rakect1Ypos enter enter this condition
        else
        {
             //if ball hit racket then change BallXdirection to change movment direction, and check the alpha  for BallYpos
            if(data.BallInfo.BallXpos < data.BallInfo.BallWidth)
            {
                data.BallInfo.BallXdirection = +1;
                this.CheckAlpha(data,data.BallInfo.BallYpos,data.RacketsInfo.Racket1Ypos,data.RacketsInfo.Racket1Height);
            }
        }
        // allways let ball move on vertical but if alpha != 0 , the  ball will move up and down depending on BallYdirection
        if(data.BallInfo.BallXpos % data.RoomInfo.Alpha === 0)
        {
            if(data.BallInfo.BallYpos > data.RoomInfo.GameHeight-data.BallInfo.BallHeight/2)
                data.BallInfo.BallYdirection = -1;
            if(data.BallInfo.BallYpos < data.BallInfo.BallHeight/2)
                data.BallInfo.BallYdirection = +1;
            data.BallInfo.BallYpos += (data.BallInfo.BallYdirection * data.RoomInfo.GameSpeed);
        }
    }
}
