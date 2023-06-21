'use client'

import NavBar from "@/app/Components/NavBar/NavBar";
import PingPongSettings from "./Components/Settings";
import { useRouter } from 'next/navigation'
export default function Game() {
  const router = useRouter();
    return (
  
      <main className="absolute inset-x-0 inset-y-0 text-white">
        <NavBar idd="1"/>
        <PingPongSettings router={router} />
      </main>
    )
  }