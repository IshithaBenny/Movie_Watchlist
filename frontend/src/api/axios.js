import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: ' https://movie-watchlist-backend-w1sr.onrender.com',
});

// This intercepts EVERY request and glues your token to it
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            // Notice the deliberate space after Bearer!
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;