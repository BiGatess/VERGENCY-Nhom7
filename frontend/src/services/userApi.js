import api from './api'; 

const userApi = {
    login: async (credentials) => {
        const { data } = await api.post('/auth/login', credentials);
        return data;
    },
    register: async (userData) => {
        const { data } = await api.post('/auth/register', userData);
        return data;
    }
};
export default userApi;