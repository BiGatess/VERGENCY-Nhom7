import axios from 'axios';
const API_URL = '/api/v1';

const userApi = {
    login: async (credentials) => {
        const { data } = await axios.post(`${API_URL}/auth/login`, credentials);
        return data;
    },
    register: async (userData) => {
        const { data } = await axios.post(`${API_URL}/auth/register`, userData);
        return data;
    },

    getAllUsers: async (token) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.get(`${API_URL}/users`, config);
        return data;
    },
};
export default userApi;