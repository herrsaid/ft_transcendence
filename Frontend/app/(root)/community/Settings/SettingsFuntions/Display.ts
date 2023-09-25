
export function Display()
{
    const GameInviter = document.getElementById("GameInviter");
    const ChatPart = document.getElementById("ChatPart");
    if(GameInviter && ChatPart)
    {
        // ChatPart.style.filter = "blur(15px)"
        GameInviter.style.display = "block";
        GameInviter.style.opacity = "1";
    }
}