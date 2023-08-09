import Profile from "./profile";


export default function Messages()
{
    return(
        <div className="flex flex-col justify-between h-[94vh] border-r border-l border-gray-500">
            <div>
                <Profile/>
            </div>
            <div className="self-center">
                <form action="">
                    <input type="text" />
                </form>
            </div>
        </div>
    )
}