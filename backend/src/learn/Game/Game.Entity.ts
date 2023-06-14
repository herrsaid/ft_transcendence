import { IsNotEmpty, IsNumber, IsString, IsBoolean } from 'class-validator';

export class GameEtity {
  @IsNumber()
  @IsNotEmpty()
  id: number;
  @IsString()
  @IsNotEmpty()
  gamename: string;
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
