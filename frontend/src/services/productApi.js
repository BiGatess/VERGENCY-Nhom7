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


const API_URL = 'http://localhost:5000/api/products';



const getAllProducts = async (params = {}) => {
    try {
        const config = {
            params: params, 
        };
        const { data } = await axios.get(API_URL, config);
        return data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error.response || error);
        throw error; 
    }
};

const getProductById = async (id) => {
    try {
        const { data } = await axios.get(`${API_URL}/${id}`);
        return data;
    } catch (error) {
        console.error(`Lỗi khi lấy sản phẩm có ID ${id}:`, error.response || error);
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
        headers: {
            ...getAuthHeaders(),
        },
    };

    const { data } = await axios.post(API_URL, formData, config);
    return data;
};


const productApi = {
    getAllProducts,
    getProductById,
    createProduct,
};

export default productApi;