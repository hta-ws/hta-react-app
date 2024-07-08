import { createReducer } from '@reduxjs/toolkit';
import {
  GET_FS_TEMPLATE_LIST,
  SET_FS_TEMPLATE_ID,
  GET_FS_TYPE_LIST,
  SET_FS_TYPE,
  GET_FS_STOCK_LIST,
  SET_FS_STOCK,
  GET_FS_SP_METADATA_LIST, // Yeni action türü
  GET_FS_REPORT_CODE_LIST, // Yeni action türü
} from 'shared/ActionTypes';

const INIT_STATE = {
  fsTemplateList: [],
  selectedTemplateId: 1,
  fsTypeList: [],
  selectedFsType: 2,
  fsStockList: [], // FS stock list için yeni state property
  selectedFsStock: null, // Seçili FS stock için yeni state property
  fsSpMetadataList: [], // Yeni state property for FS SP metadata
  fsReportCodeList: [], // Yeni state property for FS report code list
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
      if (state.fsStockList.length > 0) {
        state.selectedFsStock = state.fsStockList[0].value; // Assuming the payload contains objects with a 'value' property
      } else {
        state.selectedFsStock = null;
      }
    })
    .addCase(SET_FS_STOCK, (state, action) => {
      state.selectedFsStock = action.payload;
    })
    .addCase(GET_FS_SP_METADATA_LIST, (state, action) => {
      state.fsSpMetadataList = action.payload;
    })
    .addCase(GET_FS_REPORT_CODE_LIST, (state, action) => {
      state.fsReportCodeList = action.payload;
    });
});

export default adminReducer;
