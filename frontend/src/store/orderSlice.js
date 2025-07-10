import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderApi from '../services/orderApi';

export const createOrder = createAsyncThunk(
  'orders/create',
  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await orderApi.createOrder(orderData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || error.message);
    }
  }
);

export const fetchAllOrders = createAsyncThunk(
    'orders/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await orderApi.getAllOrders();
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data.message || error.message);
        }
    }
);

export const updateOrderAdmin = createAsyncThunk(
    'orders/updateAdmin',
    async ({ orderId, status }, { rejectWithValue }) => {
        try {
            const { data } = await orderApi.updateOrderStatus(orderId, status);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data.message || error.message);
        }
    }
);

const initialState = {
  order: null,      
  orders: [],       
  status: 'idle', 
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.status = 'idle';
      state.order = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Cases cho createOrder
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // <<< THÊM MỚI: Cases cho fetchAllOrders (admin)
      .addCase(fetchAllOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload; // Lưu danh sách vào state.orders
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // <<< THÊM MỚI: Cases cho updateOrderAdmin (admin)
      .addCase(updateOrderAdmin.fulfilled, (state, action) => {
        // Tìm đơn hàng trong danh sách và cập nhật nó
        const index = state.orders.findIndex(order => order._id === action.payload._id);
        if (index !== -1) {
            state.orders[index] = action.payload;
        }
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;