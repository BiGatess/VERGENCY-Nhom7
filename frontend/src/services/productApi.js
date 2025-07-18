import api from './api';

const getAllProducts = async (params = {}) => {
    try {
        const { data } = await api.get('/api/v1/products', { params });
        return data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error.response || error);
        throw error;
    }
};

const getProductById = async (productId) => {
    try {
        const { data } = await api.get(`/api/v1/products/${productId}`);
        return data;
    } catch (error) {
        console.error(`Lỗi khi lấy sản phẩm có ID ${productId}:`, error.response || error);
        throw error;
    }
};

const getRelatedProducts = async (productId) => {
    try {
        const { data } = await api.get(`/api/v1/products/${productId}/related`);
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

    const { data } = await api.post('/api/v1/products', formData);
    return data;
};

const updateProduct = async (id, productData) => {
    try {
        const { data } = await api.put(`/api/v1/products/${id}`, productData);
        return data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        console.error(`Lỗi khi cập nhật sản phẩm có ID ${id}:`, message);
        throw new Error(message);
    }
};

const deleteProduct = async (id) => {
    try {
        const { data } = await api.delete(`/api/v1/products/${id}`);
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