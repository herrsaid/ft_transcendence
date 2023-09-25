
export function Back()
{
    const GameInviter = document.getElementById("GameInviter");
    const ChatPart = document.getElementById("ChatPart");
    if(GameInviter && ChatPart)
    {
        // ChatPart.style.filter = "blur(0px)"
        GameInviter.style.display = "none";
        GameInviter.style.opacity = "0";
    }
}