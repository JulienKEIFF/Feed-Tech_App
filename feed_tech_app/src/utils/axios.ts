import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV == 'development' ? 'https://feedtech.nasjulienkeiff.fr' : 'http://localhost:3000'
});

export default axiosInstance;