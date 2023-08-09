import Link from 'next/link';
import '../Home.css'


export default function LiveGames() {
  return (

    <div className="live-games">
  
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
     

    <div className="live-game-card bg-gradient-to-br from-fuchsia-600 to-fuchsia-800 rounded-lg shadow-md p-6 flex flex-col justify-between">
        <div className="text-white text-lg font-semibold mb-4">Training With Bot</div>
        <p className="text-white">Enjoy Tranining with our ping pong Bot!</p>
        <Link className="text-blue-400 font-semibold mt-4 rounded-lg inline-block" href="/Game/Ofline/BOT">Training Now </Link>
      </div>


      <div className="live-game-card bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg shadow-md p-6 flex flex-col justify-between">
        <div className="text-white text-lg font-semibold mb-4">Watch Live Games</div>
        <p className="text-white">Enjoy watching live ping pong matches!</p>
        <Link className="text-blue-400 font-semibold mt-4 rounded-lg inline-block" href="/Stream">Watch Now</Link>
      </div>
  
      
      <div className="live-game-card bg-gradient-to-br from-teal-600 to-teal-800 rounded-lg shadow-md p-6 flex flex-col justify-between">
        <div className="text-white text-lg font-semibold mb-4">Start a Chat</div>
        <p className="text-white">Connect with players and start chatting!</p>
        <Link className="text-blue-400 font-semibold mt-4 rounded-lg inline-block" href="/community">Chat Now</Link>
      </div>
  
      
      <div className="live-game-card bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-lg shadow-md p-6 flex flex-col justify-between">
        <div className="text-white text-lg font-semibold mb-4">Find New Friends</div>
        <p className="text-white">Discover new players to challenge!</p>
        <a href="#" className="text-blue-400 font-semibold mt-4">Find Friends</a>
      </div>
    </div>
  </div>

  );
}