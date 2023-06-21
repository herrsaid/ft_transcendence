import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  ballxpos: number;
  @IsNumber()
  @IsNotEmpty()
  ballypos: number;
  @IsNumber()
  @IsNotEmpty()
  ping1ypos: number;
  @IsNumber()
  @IsNotEmpty()
  ping2ypos: number;
  @IsNumber()
  @IsNotEmpty()
  result1: number;
  @IsNumber()
  @IsNotEmpty()
  result2: number;
  @IsString()
  @IsNotEmpty()
  ID?: string;
  obj: GameUserSettingsEntity;
}
