import './community.css'

function Chat()
{
    return(
        <div>
            <div className='message-box'>
            <div>
            <form>
            <label>
                <input className='message' placeholder='    write your message here' type="text" name="name" />
            </label>
            </form>
            </div>
            </div>
        </div>
    );
}

export default function Community()
{
    return (
        <div className="all">
            <div className='groups'>
                groups
            </div>
            <div className='chat'>
                <h1>Chat</h1>
                <Chat />
            </div>
            <div className='friends'>
                Friends
            </div>
        </div>
    )
}