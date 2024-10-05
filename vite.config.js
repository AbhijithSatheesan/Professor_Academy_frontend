// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// const BACKEND_URL = 'https://itsmeabhijith.shop';

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






// // for development
// // vite.config.js
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'https://itsmeabhijith.shop',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       },
//       '/images': {
//         target: 'https://itsmeabhijith.shop',
//         changeOrigin: true,
//       },
//     },
//   },
// });







// for development using environment variables


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import dotenv from 'dotenv';

// // Load environment variables from .env file
// dotenv.config();

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: process.env.VITE_API_URL || 'http://127.0.0.1:8000/',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       },
//       '/images': {
//         target: process.env.VITE_IMAGE_URL || 'http://127.0.0.1:8000/',
//         changeOrigin: true,
//       },
//     },
//   },
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
  // Load env file based on the mode ('development' or 'production')
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
          target: env.VITE_IMAGE_URL,
          changeOrigin: true,
        },
      },
    },
  };
});
