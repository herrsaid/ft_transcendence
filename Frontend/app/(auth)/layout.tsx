import '../globals.css'



export const metadata = {
  title: 'login',
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
{/*       
        <div className='Site'>
          <div className='Header'>
            <Header/>
          </div>
            
            <div className='child'> */}
              {children}
            {/* </div>
          </div>
        </div> */}
        
      </body>
    </html>
  )
}