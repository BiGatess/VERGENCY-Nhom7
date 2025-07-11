import api from './api'; 

const orderApi = {
  createOrder: (orderData) => {
    return api.post('/orders', orderData);
  },
  getMyOrders: () => {
    return api.get('/orders/myorders');
  },
  getAllOrders: () => {
    return api.get('/orders');
  },
  updateOrderStatus: (orderId, status) => {
    return api.put(`/orders/${orderId}/status`, { status });
  },
};

export default orderApi;