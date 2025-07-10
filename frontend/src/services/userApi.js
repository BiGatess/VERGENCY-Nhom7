import axios from 'axios';
const API_URL = 'http://localhost:5000/api/auth';

const userApi = {
    login: async (credentials) => {
        const { data } = await axios.post(`${API_URL}/login`, credentials);
        return data;
    },
    register: async (userData) => {
        const { data } = await axios.post(`${API_URL}/register`, userData);
        return data;
    }
};
export default userApi;