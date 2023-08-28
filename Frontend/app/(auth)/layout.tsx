import Links from '../(root)/Components/Links/Links'
import './../(root)/globals.css'



export const metadata = {
  title: '42PONG/login',
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
      <body>
      <Links/>
              {children}
      </body>
    </html>
  )
}