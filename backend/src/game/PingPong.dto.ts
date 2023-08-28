import {IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RoomSettingsEntity {
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
  @IsNotEmpty()
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
