import Header from './Components/Header/Header'
import SideNavBar_Res from './Components/SideNavBar_Res/SideNavBar_Res'
import './globals.css'
import { Providers } from "./providers";
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PingPong',
  description: 'PingPong Game 2023',
  viewport: 'width=device-width, initial-scale=1.0',
}

//className={inter.className}  this give me a error !!!!!

export default function RootLayout({
  showSidebar = false,
  children,
}: {
  showSidebar:boolean,
  children: React.ReactNode
}) {
  return (
    
    <html lang="en">
      <body >
      <Providers>
        <div className='Site'>
          <div className='Header'>
            <Header/>
          </div>
          <div className='NavChild'>
          {showSidebar && <SideNavBar_Res/>}
            
            <div className='child'>
              {children}
            </div>
          </div>
        </div>
        </Providers>
      </body>
    </html>
  )
}

