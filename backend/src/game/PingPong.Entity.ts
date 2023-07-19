import { IsBoolean, IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class GameUserSettingsEntity {
  @IsNumber()
  @IsNotEmpty()
  Speed: number;
  @IsNumber()
  @IsNotEmpty()
  MapNumber: number;
  @IsString()
  @IsNotEmpty()
  ID?: string;
  @IsBoolean()
  UsedStatus?: boolean;
}

export class PingPongGamePlayEntity {
  @IsNumber()
  @IsNotEmpty()
  ping1ypos: number;
  @IsNumber()
  @IsNotEmpty()
  ballypos: number;
  @IsNumber()
  @IsNotEmpty()
  ballxpos: number;
  @IsNumber()
  @IsNotEmpty()
  rlt1: number;
  @IsNumber()
  @IsNotEmpty()
  rlt2: number;
  @IsString()
  @IsNotEmpty()
  ID?: string;
  @IsObject()
  // @IsNumber()
  obj: GameUserSettingsEntity;
}
