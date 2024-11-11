import axios from 'axios';

const api = axios.create({
  baseURL: 'https://employee-check-in-app-backend.vercel.app/api', 
});

export default api;
