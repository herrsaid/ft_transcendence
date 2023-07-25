import { Injectable } from "@nestjs/common";
import { GameHead } from "./GameHead";

@Injectable()
export class GameObj extends GameHead
{
    public GameHead: GameHead[] = [];
}