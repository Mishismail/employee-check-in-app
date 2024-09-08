import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',  // Backend running on port 8080
});

export default api;