import { combineReducers } from "@reduxjs/toolkit";
import ProductReducer from "../store/features/product/product.slice";

export const rootReducer = combineReducers({
    product: ProductReducer,
   
  })
  