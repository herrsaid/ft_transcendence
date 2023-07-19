'use client'

import PingPongSettings from "./Settings/Settings";
import { useRouter } from 'next/navigation'
export default function Game() {
  const router = useRouter();
    return (
      <main className="absolute inset-x-0 inset-y-0 text-white">
        <PingPongSettings router={router} />
      </main>
    )
  }