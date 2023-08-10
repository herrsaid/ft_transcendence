/** @type {import('next').NextConfig} */
// const nextConfig = {
//     webpack: (config, { isServer }) => {
//         // Fixes npm packages that depend on `fs` module
//         if (!isServer) {
//           config.node = {
//             fs: 'empty'
//           }
//         }
    
//         return config
//       }
// }

// module.exports = nextConfig


module.exports = {
    // webpack5: true,
    // webpack: (config) => {
    //   config.resolve.fallback = { fs: false };
  
    //   return config;
    // },
  };