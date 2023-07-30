// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'

import { extendTheme } from '@chakra-ui/react'

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#18184a',
    800: '#18184a',
    700: '#18184a',
  },
}

export const theme = extendTheme({ colors })

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp;