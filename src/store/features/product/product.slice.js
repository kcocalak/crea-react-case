import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/api";

export const getProductList = createAsyncThunk(
  "product/getProductList",
  async (data) => {
    const { page, pageSize, category } = data;
    const response = await axios.get(
      category
        ? `https://dummyjson.com/products/category/${category}?limit=${pageSize}&skip=${page}`
        : `https://dummyjson.com/products?limit=${pageSize}&skip=${page}`
    );
    return response.data;
  }
);

export const getProductDetail = createAsyncThunk(
  "product/getProductDetail",
  async (productId) => {
    const response = await axios.get(
      `https://dummyjson.com/products/${productId}`
    );
    return response.data;
  }
);

export const getCategories = createAsyncThunk(
  "product/getCategories",
  async () => {
    const response = await axios.get(
      `https://dummyjson.com/products/categories`
    );
    return response.data;
  }
);

const initialState = {
  loading: false,
  product: null,
  products: [],
  categories: [],
};

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //getProductList
      .addCase(getProductList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProductList.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
      })
      .addCase(getProductList.rejected, (state, action) => {
        state.loading = false;
        console.log(action.error.message);
      })
      //getProductDetail
      .addCase(getProductDetail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductDetail.rejected, (state, action) => {
        state.loading = false;
        console.log(action.error.message);
      })
      //getCategories
      .addCase(getCategories.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        console.log(action.error.message);
      });
  },
});

export const {} = ProductSlice.actions;
export default ProductSlice.reducer;
