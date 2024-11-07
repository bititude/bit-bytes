import axios from 'axios';

const API_ENDPOINT = import.meta.env.VITE_API_BASE_URL;

const axiosClient = axios.create({ baseURL: API_ENDPOINT });

export default axiosClient;
