import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

const api = axios.create({
    baseURL: baseURL, 
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const userInfoFromStorage = localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null;

        if (userInfoFromStorage?.token) {
            config.headers.Authorization = `Bearer ${userInfoFromStorage.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;