import Header from './Components/Header/Header'
import SideNavBar_Res from './Components/SideNavBar_Res/SideNavBar_Res'
import './globals.css'
import { Providers } from "./providers";


export const metadata = {
  title: 'PingPong',
  description: 'PingPong Game 2023',
  viewport: 'width=device-width, initial-scale=1.0',
}


export default function RootLayout({
  showSidebar = true,
  children,
}: {
  showSidebar:boolean,
  children: React.ReactNode
}) {
  return (
    
    <html lang="en">
      <body >
      <Providers>
        
            <Header/>
          
          {showSidebar && <SideNavBar_Res/>}
            
            <div className='child'>
              {children}
            </div>
        </Providers>
      </body>
    </html>
  )
}

