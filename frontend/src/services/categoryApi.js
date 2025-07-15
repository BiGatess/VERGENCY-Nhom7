import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';
const categoryApi = {
    getAllCategories: async () => {
        try {
            const { data } = await axios.get(`${API_URL}/categories`);
            return data;
        } catch (error) {
            console.error("Lỗi khi gọi API lấy danh mục:", error.response || error.message);
            return []; 
        }
    },
};

export default categoryApi;