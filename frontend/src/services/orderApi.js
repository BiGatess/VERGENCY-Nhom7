import api from './api'; 

const orderApi = {
  createOrder: async (orderData) => {
    // Thêm async/await và .data
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  getMyOrders: async () => {
    const response = await api.get('/orders/myorders');
    return response.data;
  },

  getAllOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  },

  updateOrderStatus: async (orderId, status) => {
    const response = await api.put(`/orders/${orderId}/status`, { status });
    return response.data;
  },
};

export default orderApi;