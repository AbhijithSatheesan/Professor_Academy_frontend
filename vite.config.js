// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// const isProduction = true; // Hardcoded as true for production the same exists in viteconfig file

// export default defineConfig(() => {
//   const productionBaseURL = 'https://itsmeabhijith.shop';

//   return {
//     plugins: [react()],
//     server: {
//       proxy: isProduction
//         ? {} // No proxy in production
//         : {
//             '/api': {
//               target: `${productionBaseURL}/api`,
//               changeOrigin: true,
//               rewrite: (path) => path.replace(/^\/api/, ''),
//             },
//             '/images': {
//               target: productionBaseURL,
//               changeOrigin: true,
//             },
//           },
//     },
//     define: {
//       'import.meta.env.PROD': JSON.stringify(isProduction), // Hardcoded
//     },
//   };
// });

























// http://127.0.0.1:8000/



// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// const BACKEND_URL = 'http://127.0.0.1:8000/';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: `${BACKEND_URL}/api`,
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       },
//       '/images': {
//         target: BACKEND_URL,
//         changeOrigin: true,
//       },
//     },
//   },
// });





// https://itsmeabhijith.shop/


import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: `${env.VITE_API_URL}/api`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/images': {
          target: env.VITE_API_URL,
          changeOrigin: true,
        },
      },
    },
  };
});
