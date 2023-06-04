import { createSlice } from "@reduxjs/toolkit";

export const paginationSlice = createSlice({
  name: "pagination",
  initialState:{
    offset: 0,
  },
  //reducersを定義して、actionを受け取った時にstateをどう変更するかを定義する
  reducers: {
    //action.payloadでactionの引数を受け取れる
    pageQuery: (state,action) => {
      //stateのoffsetはactionの引数であるaction.payloadに10をかけたもの
      //この場合のpayloadは1から始まるページ番号
      state.offset = (action.payload)*10 
    }
  }
})

export const { pageQuery } = paginationSlice.actions;