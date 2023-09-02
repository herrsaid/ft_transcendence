import Cookies from 'js-cookie';
import useSWR from "swr"

interface props{
    id:number,
  }



const UserRank = (props:props) => {
    let rankbg;
    const fetchData = async (url:string) => {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`
             }});
            return res.json();
          }
    
    
    const {data, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_BACK_IP}/user/rank/player/${props.id}`,
    fetchData
    );
    if (!data)
        return null;
    if (data.rank == 'beginner')
        rankbg = 'bg-purple-500';
    else if (data.rank == 'bronze')
        rankbg = 'bg-gray-500';
    else if (data.rank == 'silver')
        rankbg = 'bg-indigo-500';
    else if(data.rank == 'gold')
        rankbg = 'bg-yellow-500';
    else if(data.rank == 'diamond')
        rankbg = 'bg-sky-500';
    else if(data.rank == 'platiniom')
        rankbg = 'bg-violet-500';
    else if(data.rank == 'legendary')
        rankbg = 'bg-emerald-500';
    return (
        <div className={`rounded-md md:rounded-lg lg:rounded-lg ${rankbg} text-white py-1 px-2 text-sm font-semibold mr-4 transform transition-transform duration-300 hover:scale-105`}>
        Rank: {data.rank}
      </div>
    )
}

export default UserRank;