import React from 'react';
import Layout from 'layout.tsx'

function MyApp({ Component, pageProps, router }) {
 
  const pathsWithoutSidebar = ['/login'];

  const shouldExcludeSidebar = pathsWithoutSidebar.includes(router.pathname);

  
  return (
    <Layout showSidebar={!shouldExcludeSidebar}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

