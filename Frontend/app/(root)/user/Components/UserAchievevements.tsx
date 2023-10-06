import Cookies from 'js-cookie';
import Link from "next/link";
import useSWR from "swr"
import UserOneAchievement from "./UserOneAchievement";


interface Achievevement{
    id:number,
}

const UserAchievevements = (props:Achievevement) => {

  
  let myAchievevement;
  
  const Achievevement = async (url:string) => {
      const res = await fetch(url, {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${Cookies.get('access_token')}`
           }});

  return res.json();
}


  const {data, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_BACK_IP}/user/archievements/player/${props.id}`,
  Achievevement
  );


  try
  {
    if (data)
      {
        myAchievevement = data.map((Achievevement:any) => {
              return <UserOneAchievement name={Achievevement.archievement_name} key={Achievevement.key}/>
          });
      }

  }
  catch{
    return null;
  }


  
    try{
    if (!data.length)
    {
          return (
                    <main className="container mx-auto py-8 px-4">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
                
                        
                <div className="live-game-card stats-bgf rounded-lg shadow-md p-6 flex flex-col justify-between">
                
                <p className="text-white">This User Dont have Any Achievevement Yet!</p>
                <Link href="/Game/Lobbie" className="text-blue-400 font-semibold mt-4">
                Play Now
                </Link>

              </div>
                
                </div>
              </main>
          )  
  }
  }
  catch{
      return null;
  }
    return (


        <main className="container mx-auto py-8 pl-8">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
            {myAchievevement ? myAchievevement : "No Achievevement!"}
     
        </div>
      </main>



    );
};
export default UserAchievevements;