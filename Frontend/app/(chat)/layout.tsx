
import Header from '../(root)/Components/Header/Header';
import './globals.css'



export const metadata = {
  title: 'chat',
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
      <body >
      
        
            <Header/>
          
          
            
            <div className='child'>
              {children}
            </div>
        
      </body>
    </html>
  )
}