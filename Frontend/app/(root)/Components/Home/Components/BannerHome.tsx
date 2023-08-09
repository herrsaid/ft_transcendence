import Link from 'next/link';
import '../Home.css'

export default function BannerHome() {
  return (

    <div className="container mx-auto">
      <div className="rounded-lg shadow-md bg-gradient-to-br from-purple-600 to-indigo-800 text-white p-8"> 
      <h1 className="text-4xl font-bold mb-4">Welcome to 42 Pong Arena</h1>
      <p className="text-lg mb-4">Join the most thrilling ping pong community and challenge the best players in 42!</p>
      <Link className="bg-white text-blue-400 font-semibold py-2 px-4 rounded-lg inline-block" href="/Game/Lobbie">Get Started</Link>
      </div>
      
    </div>

  );
}