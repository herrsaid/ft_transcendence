import Link from "next/link";


const OneFriend = (props) => {
    return (


            <Link href={`http://localhost:3000/user/${props.id}`}>
        <div className="friend">
        <div className="inside_friend">
            <img src={props.image} alt="" />
            <p>{props.usrname}</p>
        </div>

        <p className="enligne">
            {props.status?"Active" : "Offline"}
        </p>
        
    </div>
    </Link>
    );
};
export default OneFriend;