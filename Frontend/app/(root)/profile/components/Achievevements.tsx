import OneAchievevement from "./OneAchievement";
import Cookies from 'js-cookie';
import Link from "next/link";
import { useRouter } from "next/navigation";
import useSWR from "swr"
        
const Achievevements = () => {

  const router = useRouter();
  let myAchievevement;
  
  const Achievevement = async (url:string) => {
      const res = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`,
        }});

  return res.json();
}



  const {data, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_BACK_IP}/user/archievements/me`,
  Achievevement
  );


  try
  {
    if (data)
    {
      myAchievevement = data.map((Achievevement:any) => {
            return <OneAchievevement name={Achievevement.archievement_name} key={Achievevement.key}/>
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
      <div className="text-white text-lg font-semibold mb-4">Play Games Now</div>
      <p className="text-white">You Dont have Any Achievevement Yet!</p>
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
export default Achievevements;