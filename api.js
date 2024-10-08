import axios from 'axios';

const isProduction = true; // Hardcoded as true for production the same exists in viteconfig file
const productionBaseURL = 'http://127.0.0.1:8000/'; // Replace with your production API URL

const api = axios.create({
  baseURL: isProduction ? productionBaseURL : '', // Base URL only in production
  withCredentials: true,
});

// Intercept requests
api.interceptors.request.use((config) => {
  // If it's a relative URL and we're in production, prepend the base URL
  if (isProduction && !config.url.startsWith('http')) {
    config.url = `${productionBaseURL}${config.url}`;
  }
  return config;
});

export default api;



// http://127.0.0.1:8000/
// https://itsmeabhijith.shop/