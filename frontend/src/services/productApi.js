import axios from 'axios';

const API_URL = '/api/v1/products';

const getAllProducts = async (params) => {
  const response = await axios.get(API_URL, { params });
  return response.data;
};

const getProductById = async (productId) => {
  const response = await axios.get(`${API_URL}/${productId}`);
  return response.data;
};

const getRelatedProducts = async (productId) => {
  const response = await axios.get(`${API_URL}/${productId}/related`);
  return response.data;
};

const createProduct = async (productData, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, productData, config);
  return response.data;
};

const productApi = {
  getAllProducts,
  getProductById,
  getRelatedProducts,
  createProduct,
};

export default productApi;