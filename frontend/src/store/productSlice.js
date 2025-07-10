import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productApi from '../services/productApi'; 


export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const data = await productApi.getAllProducts(params);
      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (productId, { rejectWithValue }) => {
    try {
      const data = await productApi.getProductById(productId);
      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/create',
  async (productData, { rejectWithValue }) => {
    try {
      const data = await productApi.createProduct(productData);
      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

export const fetchRelatedProducts = createAsyncThunk(
  'products/fetchRelated',
  async (productId, { rejectWithValue }) => {
    try {
      // Giả sử API của bạn là /api/products/:productId/related
      const data = await productApi.getRelatedProducts(productId);
      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);



const initialState = {
  products: [],
  status: 'idle', 
  error: null,

  selectedProduct: null,
  status_single: 'idle', 
  error_single: null,

  createStatus: 'idle',

  relatedProducts: [],
  relatedStatus: 'idle', 
};



const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
      state.status_single = 'idle';
      state.error_single = null;
      state.relatedProducts = [];
      state.relatedStatus = 'idle';
    },
    resetCreateStatus: (state) => {
        state.createStatus = 'idle';
        state.error = null; 
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; })
      
      .addCase(fetchProductById.pending, (state) => { state.status_single = 'loading'; })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status_single = 'succeeded';
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => { state.status_single = 'failed'; state.error_single = action.payload; })

      .addCase(createProduct.pending, (state) => { state.createStatus = 'loading'; })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.createStatus = 'succeeded';
        state.products.unshift(action.payload); 
      })
      .addCase(createProduct.rejected, (state, action) => { state.createStatus = 'failed'; state.error = action.payload; })

      .addCase(fetchRelatedProducts.pending, (state) => { state.relatedStatus = 'loading'; })
      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.relatedStatus = 'succeeded';
        state.relatedProducts = action.payload;
      })
      .addCase(fetchRelatedProducts.rejected, (state, action) => { state.relatedStatus = 'failed'; });
  },
});

export const { clearSelectedProduct, resetCreateStatus } = productSlice.actions;
export default productSlice.reducer;