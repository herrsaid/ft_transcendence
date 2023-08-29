import { RoomSettings, UserInfo, UserInfo1 } from "./PingPong.dto";

export const RoomSettingsValidator = (RS:RoomSettings):boolean =>
{
    if(RS.speed == undefined || RS.points == undefined
        || RS.roomMood == undefined || RS.myusername == undefined
        || RS.myimage == undefined || RS.inputValue == undefined)
    {
        console.log("missing data");
        return false;
    }
    else if( typeof RS.speed !== "number" || typeof RS.points !== "number"
        || typeof RS.roomMood !== "boolean" || typeof RS.myusername !== "string"
        || typeof RS.myimage !== "string" || typeof RS.inputValue !== "string")
    {
        console.log("invalid RoomSettings form");
        return false;
    }
    return true;
}

export const UserInfoValidator = (UI:UserInfo):boolean =>
{
    if(UI.roomNumber == undefined || UI.username == undefined || UI.myimage == undefined)
    {
        console.log("invalid UserInfo form");
        return false;
    }
    else if(typeof UI.roomNumber !== "number" || typeof UI.username !== "string"
        || typeof UI.myimage !== "string")
    {
        console.log("invalid UserInfo form");
        return false;
    }
    return true;
}

export const UserInfoIValidator = (UII:UserInfo1):boolean =>
{
    if(UII.target == undefined || UII.username == undefined || UII.myimage== undefined)
    {
        console.log("invalid UserInfoI form");
        return false;
    }
    else if(typeof UII.target !== "string" || typeof UII.username !== "string"
        || typeof UII.myimage !== "string")
    {
        console.log("invalid UserInfoI form");
        return false;
    }
    return true;
}