import { createSlice } from "@reduxjs/toolkit";

export const paginationSlice = createSlice({
  name: "pagination",
  initialState:{
    offset: 0,
  },
  reducers: {
    pageQuery: (state,action) => {
      state.offset = (action.payload-1)*10 
    }
  }
})

export const { pageQuery } = paginationSlice.actions;