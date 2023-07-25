'use client'

import PingPongSettings from "./Settings/Settings";
import { useRouter } from 'next/navigation'
export default function Game() {
  const router = useRouter();
    return (
        <PingPongSettings router={router} />
    )
  }