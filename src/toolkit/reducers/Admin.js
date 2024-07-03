import { createReducer } from '@reduxjs/toolkit';
import {
  GET_FS_TEMPLATE_LIST,
  SET_FS_TEMPLATE_ID,
  GET_FS_TYPE_LIST,
  SET_FS_TYPE,
  GET_FS_STOCK_LIST,
  SET_FS_STOCK,
} from 'shared/ActionTypes';

const INIT_STATE = {
  fsTemplateList: [],
  selectedTemplateId: 1,
  fsTypeList: [],
  selectedFsType: 2,
  fsStockList: [], // New state property for FS stock list
  selectedFsStock: null, // New state property for selected FS stock
};

const adminReducer = createReducer(INIT_STATE, (builder) => {
  builder
    .addCase(GET_FS_TEMPLATE_LIST, (state, action) => {
      state.fsTemplateList = action.payload;
    })
    .addCase(SET_FS_TEMPLATE_ID, (state, action) => {
      state.selectedTemplateId = action.payload;
    })
    .addCase(GET_FS_TYPE_LIST, (state, action) => {
      state.fsTypeList = action.payload;
    })
    .addCase(SET_FS_TYPE, (state, action) => {
      state.selectedFsType = action.payload;
    })
    .addCase(GET_FS_STOCK_LIST, (state, action) => {
      state.fsStockList = action.payload;
    })
    .addCase(SET_FS_STOCK, (state, action) => {
      state.selectedFsStock = action.payload;
    });
});

export default adminReducer;
