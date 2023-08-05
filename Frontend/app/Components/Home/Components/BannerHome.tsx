import '../Home.css'

export default function BannerHome() {
  return (

    <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white p-8">
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-4">Welcome to 42 Pong Arena</h1>
      <p className="text-lg mb-4">Join the most thrilling ping pong community and challenge the best players in 42!</p>
      <a href="#" className="bg-white text-pink-500 font-semibold py-2 px-4 rounded-lg inline-block">Get Started</a>
    </div>
  </div>

  );
}