"use client"
import Login from "./components/Login/Login";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const router = useRouter();
  if (Cookies.get('access_token') != undefined)
  {
    router.replace('/')
  }
  return (
    <>
        <Login/>
    </>
  )
}