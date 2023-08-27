import Link from 'next/link';
import '../Home.css'

export default function BannerHome() {
  return (

    <div className="container mx-auto">
      <div className="live-game-card rounded-lg shadow-md starthome text-white p-8"> 
      <h1 className="text-2xl font-bold mb-4">Welcome to 42 Pong Arena</h1>
      <p className="text-md mb-4">Join the most thrilling ping pong community and challenge the best players in 42!</p>
      <Link className=" forhover bg-gradient-to-br from-purple-600 to-indigo-800  font-semibold py-2 px-4 rounded-lg inline-block" href="/Game/Lobbie">Get Started</Link>
      </div>
      
    </div>

  );
}