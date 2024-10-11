import axios from 'axios';

const isProduction = true; // Hardcoded as true for production
const productionBaseURL = 'https://itsmeabhijith.shop/'; // Your production API URL

export const getFullURL = (path) => {
  return isProduction ? `${productionBaseURL}${path}` : path;
};

const api = axios.create({
  baseURL: isProduction ? productionBaseURL : '',
  withCredentials: true,
});

// Intercept requests
api.interceptors.request.use((config) => {
  if (isProduction && !config.url.startsWith('http')) {
    config.url = `${productionBaseURL}${config.url}`;
  }
  return config;
});

export default api;






// import axios from 'axios';

// const isProduction = true; // Hardcoded as true for production
// const productionBaseURL = 'http://127.0.0.1:8000/'; // Base URL for production API and images

// const api = axios.create({
//   baseURL: isProduction ? productionBaseURL : '', // Base URL only in production
//   withCredentials: true,
// });

// // Intercept requests
// api.interceptors.request.use((config) => {
//   // Prepend the base URL for relative URLs in production
//   if (isProduction && !config.url.startsWith('http')) {
//     // Check if the URL is an image path (e.g., contains '/images/')
//     if (config.url.includes('/images/')) {
//       config.url = `${productionBaseURL}${config.url}`; // Ensure images are loaded from production base URL
//     } else {
//       // Handle other relative URLs (e.g., API calls)
//       config.url = `${productionBaseURL}${config.url}`;
//     }
//   }
//   return config;
// });

// export default api;


// // http://127.0.0.1:8000/
// // https://itsmeabhijith.shop/



// import axios from 'axios';

// const isProduction = true; // Hardcoded as true for production the same exists in viteconfig file
// const productionBaseURL = 'https://itsmeabhijith.shop/'; // Replace with your production API URL

// const api = axios.create({
//   baseURL: isProduction ? productionBaseURL : '', // Base URL only in production
//   withCredentials: true,
// });

// // Intercept requests
// api.interceptors.request.use((config) => {
//   // If it's a relative URL and we're in production, prepend the base URL
//   if (isProduction && !config.url.startsWith('http')) {
//     config.url = `${productionBaseURL}${config.url}`;
//   }
//   return config;
// });

// export default api;



// // http://127.0.0.1:8000/
// // https://itsmeabhijith.shop/