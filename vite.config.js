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






// for development
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://itsmeabhijith.shop',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/images': {
        target: 'https://itsmeabhijith.shop',
        changeOrigin: true,
      },
    },
  },
});
