import api from './api'; 

const productApi = {
  getAllProducts: async (params) => {
    const { data } = await api.get('/products', { params });
    return data;
  },
  getProductById: async (productId) => {
    const { data } = await api.get(`/products/${productId}`);
    return data;
  },
  getRelatedProducts: async (productId) => {
    const { data } = await api.get(`/products/${productId}/related`);
    return data;
  },
  createProduct: async (productData) => {
    const { data } = await api.post('/products', productData);
    return data;
  },
};

export default productApi;