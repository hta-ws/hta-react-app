import { createSelector } from 'reselect';

const selectAdmin = (state) => state.admin;

export const selectSpMetadata = createSelector(
  [selectAdmin],
  (admin) => admin.spMetadataList || [],
);

export const selectSelectedPopulationRecord = createSelector(
  [selectAdmin],
  (admin) => admin.selectedPopulationRecord || null,
);

export const selectFinancialStatementProcedureList = createSelector(
  [selectAdmin],
  (admin) => admin.financialStatementProcedureList || [],
);

export const selectReportCodeList = createSelector(
  [selectAdmin],
  (admin) => admin.reportCodeList || [],
);
export const selectFinancialStatementFormatId = createSelector(
  [selectAdmin],
  (admin) => admin.financialStatementFormatId || [],
);

export const selectSelectedFormulaRecord = createSelector(
  [selectAdmin],
  (admin) => admin.selectedFormulaRecord || null,
);

export const selectFinancialStatementFormatList = createSelector(
  [selectAdmin],
  (admin) => admin.financialStatementFormatList || null,
);
