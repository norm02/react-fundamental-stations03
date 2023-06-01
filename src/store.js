import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { paginationSlice } from "./paginationSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    pagination: paginationSlice.reducer
  },
});
