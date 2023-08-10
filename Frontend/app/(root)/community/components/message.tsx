

export default function Message(props:any)
{
    return(
        <div className={props.class}>
            <p>{props.content}</p>
        </div>
    )
}