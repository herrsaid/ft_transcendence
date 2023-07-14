import zabiHeader from './Components/Header/zabiHeader'
import SideNavBar_Res from './Components/SideNavBar_Res/SideNavBar_Res'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PingPong',
  description: 'PingPong Game 2023',
  viewport: 'width=device-width, initial-scale=1.0',

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='Site'>
          <div className='Header'>
            <zabiHeader/>
          </div>
          <div className='NavChild'>
            <SideNavBar_Res/>
            <div className='child'>
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}