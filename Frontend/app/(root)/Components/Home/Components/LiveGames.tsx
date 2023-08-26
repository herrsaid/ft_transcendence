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

    <h1 className="text-2xl font-bold mb-4">Training With Bot</h1>
      <p className="text-md mb-4">Enjoy Tranining with our ping pong Bot!</p>
      <Link className=" bg-gradient-to-br from-purple-600 to-indigo-800 font-semibold py-2 px-4 rounded-lg inline-block" href="/Game/Ofline/BOT">Get Started</Link>
       
      </div>



      <div className="live-game-card bannerwatch rounded-lg shadow-md p-6  justify-between">
        <div className="text-white text-lg font-semibold mb-4"></div>
        <p className="text-white"></p>
        <Link className=" bg-gradient-to-br from-purple-600 to-indigo-800 font-semibold mt-20 py-2 px-4 rounded-lg inline-block" href="/Stream">Watch Now</Link>
      </div>
  
      
      <div className="live-game-card bannerchat rounded-lg shadow-md p-6  justify-between">
        <div className="text-white text-lg font-semibold mb-4"></div>
        <p className="text-white"></p>
        <Link className=" bg-gradient-to-br from-purple-600 to-indigo-800 font-semibold mt-20 py-2 px-4 rounded-lg inline-block" href="/community">Chat Now</Link>
      </div>
  
      
      <div className="live-game-card bannerfind rounded-lg shadow-md p-6  justify-between">
        <div className="text-white text-lg font-semibold mb-4"></div>
        <p className="text-white"></p>
        <Link className=" bg-gradient-to-br from-purple-600 to-indigo-800 font-semibold mt-20 py-2 px-4 rounded-lg inline-block" href="/Users">Find Friends</Link>
      </div>


    </div>
  </div>

  );
}