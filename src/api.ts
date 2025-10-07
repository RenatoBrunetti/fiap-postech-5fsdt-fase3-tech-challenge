import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL as string;
const headers = {
  'Content-Type': 'application/json',
};

const api = axios.create({ baseURL, headers });

export default api;
