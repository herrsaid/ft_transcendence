import NavBar from "@/app/Components/NavBar/NavBar";
import PingPongSettings from "./Components/Settings";

export default function CardGames() {

    return (
  
      <main className="absolute inset-x-0 inset-y-0 text-white">
        <NavBar idd="1"/>
        <PingPongSettings/>
      </main>
    )
  }