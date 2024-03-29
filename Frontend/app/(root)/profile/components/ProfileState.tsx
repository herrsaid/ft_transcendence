import Cookies from 'js-cookie';
import useSWR from "swr"


const ProfileState = () => {

    
    const fetchFriends = async (url:string) => {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`
             }});
    return res.json();
}


    const {data, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_BACK_IP}/user/stats/me`,
    fetchFriends
    );

    if (!data)
    {
      return (<div className="text-center">
      <div className="stats-bg rounded-lg shadow-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
  
  
  
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-600">Total Games</h3>
          <p className="text-3xl font-bold text-blue-500">0</p>
        </div>
  
  
  
  
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-600">Total Wins</h3>
          <p className="text-3xl font-bold text-green-500">0</p>
        </div>
  
  
  
  
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-600">Total Achievements</h3>
          <p className="text-3xl font-bold text-purple-500">0</p>
        </div>
  
  
  
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-600">Total Losses</h3>
          <p className="text-3xl font-bold text-yellow-500">0</p>
        </div>
      </div>
    </div>
      
    </div>)
    }

    
    return (
        <>
             <div className="text-center">
    <div className="stats-bg rounded-lg shadow-lg p-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      



      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-600">Total Games</h3>
        <p className="text-3xl font-bold text-blue-500">{data.totalgames}</p>
      </div>




      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-600">Total Wins</h3>
        <p className="text-3xl font-bold text-green-500">{data.totalwins}</p>
      </div>




      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-600">Total Achievements</h3>
        <p className="text-3xl font-bold text-purple-500">{data.totalarchievements}</p>
      </div>



      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-600">Total Losses</h3>
        <p className="text-3xl font-bold text-yellow-500">{data.totalosses}</p>
      </div>
    </div>
  </div>
    
  </div>
        </>
    );
};
export default ProfileState;
