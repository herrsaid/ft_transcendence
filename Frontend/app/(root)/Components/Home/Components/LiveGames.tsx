import Link from 'next/link';
import '../Home.css'
import BannerHome from './BannerHome';
import HomeStats from './HomeStats';


export default function LiveGames() {
  return (

    <div className="live-games">
  
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
     
    <BannerHome/>

    <HomeStats/>
    <div className="live-game-card aibanner rounded-lg shadow-md p-6 ">

    <h1 className="text-xl font-semibold mb-4"> <span className=' text-purple-500'>Bot</span> Training</h1>
      
      <Link className=" forhover bg-gradient-to-br from-purple-600 to-indigo-800 font-semibold py-2 px-4 rounded-lg inline-block mt-20" href="/Game/Ofline/BOT">Get Started</Link>
       
      </div>



      <div className="live-game-card bannerwatch rounded-lg shadow-md p-6  justify-between">
      <h1 className="text-xl font-semibold ">Watch <span className=' text-purple-500'>Games</span></h1>
        <p className="text-white"></p>
        <Link className=" forhover bg-gradient-to-br from-purple-600 to-indigo-800 font-semibold mt-20 py-2 px-4 rounded-lg inline-block" href="/Stream">Watch Now</Link>
      </div>
  
      
      <div className="live-game-card bannerchat rounded-lg shadow-md p-6  justify-between">
      <h1 className="text-xl font-semibold ">Chat <span className=' text-purple-500'>Now</span></h1>
        <p className="text-white"></p>
        <Link className=" forhover bg-gradient-to-br from-purple-600 to-indigo-800 font-semibold mt-20 py-2 px-4 rounded-lg inline-block" href="/community">Chat Now</Link>
      </div>
  
      
      <div className="live-game-card bannerfind rounded-lg shadow-md p-6  justify-between">
        
        <h1 className="text-xl font-semibold ">Find <span className=' text-purple-500'>Friends</span></h1>

        
        <p className="text-white"></p>
        <Link className=" forhover bg-gradient-to-br from-purple-600 to-indigo-800 font-semibold mt-16 py-2 px-4 rounded-lg inline-block" href="/Users">Find Friends</Link>
      </div>


    </div>
  </div>

  );
}