import axios from 'axios';

const getAuthHeaders = () => {
    const userInfoFromStorage = localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null;

    if (userInfoFromStorage && userInfoFromStorage.token) {
        return {
            Authorization: `Bearer ${userInfoFromStorage.token}`,
        };
    }
    return {};
};

const API_URL = 'http://localhost:5000/api/v1/products';

const getAllProducts = async (params = {}) => {
    try {
        const config = { params };
        const { data } = await axios.get(API_URL, config);
        return data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error.response || error);
        throw error; 
    }
};

const getProductById = async (productId) => { 
    try {
        const { data } = await axios.get(`${API_URL}/${productId}`);
        return data;
    } catch (error) {
        console.error(`Lỗi khi lấy sản phẩm có ID ${productId}:`, error.response || error);
        throw error;
    }
};

const getRelatedProducts = async (productId) => {
    try {
        const { data } = await axios.get(`${API_URL}/${productId}/related`);
        return data;
    } catch (error) {
        console.error(`Lỗi khi lấy sản phẩm liên quan cho ID ${productId}:`, error.response || error);
        throw error;
    }
};

const createProduct = async (productData) => {
    const formData = new FormData();
    Object.keys(productData).forEach(key => {
        if (key === 'images') {
            if (productData.images && productData.images.length > 0) {
                productData.images.forEach(imageFile => {
                    formData.append('images', imageFile);
                });
            }
        } else if (key === 'sizes') {
             if (productData.sizes && Array.isArray(productData.sizes)) {
                productData.sizes.forEach(size => {
                    formData.append('sizes[]', size);
                });
            }
        } else {
            formData.append(key, productData[key]);
        }
    });

    const config = {
        headers: { ...getAuthHeaders() },
    };
    const { data } = await axios.post(API_URL, formData, config);
    return data;
};

const updateProduct = async (id, productData) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders(),
            },
        };
        const { data } = await axios.put(`${API_URL}/${id}`, productData, config);
        return data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        console.error(`Lỗi khi cập nhật sản phẩm có ID ${id}:`, message);
        throw new Error(message);
    }
};

const deleteProduct = async (id) => {
    try {
        const config = {
            headers: {
                ...getAuthHeaders(),
            },
        };
        const { data } = await axios.delete(`${API_URL}/${id}`, config);
        return data; 
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        console.error(`Lỗi khi xóa sản phẩm có ID ${id}:`, message);
        throw new Error(message);
    }
};


const productApi = {
    getAllProducts,
    getProductById,
    getRelatedProducts, 
    createProduct,
    updateProduct, 
    deleteProduct, 
};

export default productApi;