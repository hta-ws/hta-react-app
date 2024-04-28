import {
  GET_FINANCIAL_STATEMENT_FORMAT_LIST,
  GET_FINANCIAL_STATEMENT_TYPE_LIST,
  GET_FINANCIAL_STATEMENT_PROCEDURE_LIST,
  SET_FINANCIAL_STATEMENT_FORMAT,
  SET_FINANCIAL_STATEMENT_TYPE,
  SET_FINANCIAL_STATEMENT_CURRENT_POPULATION_RECORD,
  GET_FINANCIAL_STATEMENT_SAMPLE_STOCK_CODE_LIST,
  SET_FINANCIAL_STATEMENT_SAMPLE_STOCK_CODE,
  GET_SP_METADATA_LIST,
  GET_REPORT_CODE_LIST,
  SET_SELECTED_FORMULA_RECORD,
} from 'shared/ActionTypes';

import { createReducer } from '@reduxjs/toolkit';

const INIT_STATE = {
  financialStatementFormatList: [],
  financialStatementTypeList: [],
  financialStatementProcedureList: [],
  financialStatementSampleStockCodeList: [],

  financialStatementFormatId: 1,
  financialStatementTypeId: 2,
  selectedPopulationRecord: null,
  selectedSampleStockCode: null,
  spMetadataList: [],
  reportCodeList: [],
  selectedFormulaRecord: null,
};

const adminReducer = createReducer(INIT_STATE, (builder) => {
  builder
    .addCase(GET_FINANCIAL_STATEMENT_FORMAT_LIST, (state, action) => {
      state.financialStatementFormatList = action.payload;
    })
    .addCase(GET_FINANCIAL_STATEMENT_TYPE_LIST, (state, action) => {
      state.financialStatementTypeList = action.payload;
    })
    .addCase(GET_FINANCIAL_STATEMENT_PROCEDURE_LIST, (state, action) => {
      state.financialStatementProcedureList = action.payload;
    })
    .addCase(SET_FINANCIAL_STATEMENT_FORMAT, (state, action) => {
      state.financialStatementFormatId = action.payload;
      state.financialStatementSampleStockCodeList = [];
    })
    .addCase(SET_FINANCIAL_STATEMENT_TYPE, (state, action) => {
      state.financialStatementTypeId = action.payload;
    })
    .addCase(
      GET_FINANCIAL_STATEMENT_SAMPLE_STOCK_CODE_LIST,
      (state, action) => {
        state.financialStatementSampleStockCodeList = action.payload;
      },
    )
    .addCase(SET_FINANCIAL_STATEMENT_SAMPLE_STOCK_CODE, (state, action) => {
      state.selectedSampleStockCode = action.payload;
    })
    .addCase(GET_SP_METADATA_LIST, (state, action) => {
      state.spMetadataList = action.payload;
    })
    .addCase(GET_REPORT_CODE_LIST, (state, action) => {
      state.reportCodeList = action.payload;
    })
    .addCase(
      SET_FINANCIAL_STATEMENT_CURRENT_POPULATION_RECORD,
      (state, action) => {
        state.selectedPopulationRecord = action.payload;
      },
    )
    .addCase(SET_SELECTED_FORMULA_RECORD, (state, action) => {
      state.selectedFormulaRecord = action.payload;
    });
});

export default adminReducer;
