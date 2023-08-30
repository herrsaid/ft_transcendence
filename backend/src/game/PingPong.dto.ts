import {IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';



export class OnlineDTO
{
  @IsString()
  @IsNotEmpty()
  username:string;
}

export class RequestRefusedDTO
{
  @IsString()
  @IsNotEmpty()
  targrt:string;
}

export class NewSpectator
{
  @IsNumber()
  @IsNotEmpty()
  RoomNumber:number;
}
export class FirstConnection 
{
  @IsNumber()
  @IsNotEmpty()
  speed : number;
  @IsNumber()
  @IsNotEmpty()
  points : number;
  @IsString()
  @IsNotEmpty()
  myusername : string
  @IsString()
  @IsNotEmpty()
  myimage : string
}

export class PlayerPos
{
  @IsNumber()
  @IsNotEmpty()
  data : number;
}

export class RoomSettings {
  @IsNumber()
  @IsNotEmpty()
  speed: number;
  @IsNumber()
  @IsNotEmpty()
  points: number;
  @IsBoolean()
  @IsNotEmpty()
  roomMood: boolean;
  @IsString()
  @IsNotEmpty()
  myusername: string | null;
  @IsString()
  @IsNotEmpty()
  myimage: string | null;
  @IsString()
  inputValue: string | null;
}

export class UserInfo {
  @IsNumber()
  @IsNotEmpty()
  roomNumber: number;
  @IsString()
  @IsNotEmpty()
  username: string | null;
  @IsString()
  @IsNotEmpty()
  myimage: string | null;
}

export class UserInfo1 {
  @IsString()
  @IsNotEmpty()
  target: string;
  @IsString()
  @IsNotEmpty()
  username: string | null;
  @IsString()
  @IsNotEmpty()
  myimage: string | null;
}
