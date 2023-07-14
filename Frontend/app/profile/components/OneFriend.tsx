import Link from "next/link";


interface props{
    image:string,
    username:string,
    status:boolean
    id:number
}

const OneFriend = (props:props) => {
    return (


            <Link href={`/user/${props.id}`}>
        <div className="friend">
        <div className="inside_friend">
            <img src={props.image} alt="" />
            <p>{props.username}</p>
        </div>

        <p className="enligne">
            {props.status?"Active" : "Offline"}
        </p>
        
    </div>
    </Link>
    );
};
export default OneFriend;