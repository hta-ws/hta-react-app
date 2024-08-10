import { createSelector } from 'reselect';

// Admin Selectors
export const selectFsAdmin = (state) => state.fsAdmin;

export const selectFsTemplateList = createSelector(
  [selectFsAdmin],
  (fsAdmin) => fsAdmin.fsTemplateList || [],
);

export const selectFsTemplateId = createSelector(
  [selectFsAdmin],
  (fsAdmin) => fsAdmin.selectedTemplateId || null,
);

// New selector for fsTypeList
export const selectFsTypeList = createSelector(
  [selectFsAdmin],
  (fsAdmin) => fsAdmin.fsTypeList || [],
);

// New selector for selectedFsType
export const selectFsType = createSelector(
  [selectFsAdmin],
  (fsAdmin) => fsAdmin.selectedFsType || null,
);

// New selector for fsStockList
export const selectFsStockList = createSelector(
  [selectFsAdmin],
  (fsAdmin) => fsAdmin.fsStockList || [],
);

// New selector for selectedFsStock
export const selectFsStock = createSelector(
  [selectFsAdmin],
  (fsAdmin) => fsAdmin.selectedFsStock || null,
);

// New selector for fsSpMetadataList
export const selectFsSpMetadataList = createSelector(
  [selectFsAdmin],
  (fsAdmin) => fsAdmin.fsSpMetadataList || [],
);

// New selector for fsReportCodeList
export const selectFsReportCodeList = createSelector(
  [selectFsAdmin],
  (fsAdmin) => fsAdmin.fsReportCodeList || [],
);

// New selector for fsProcedureList
export const selectFsProcedureList = createSelector(
  [selectFsAdmin],
  (fsAdmin) => fsAdmin.fsProcedureList || [],
);

// Export all selectors
// export {
//   selectFsTemplateList,
//   selectFsTemplateId,
//   selectFsTypeList,
//   selectFsType,
//   selectFsStockList,
//   selectFsStock,
//   selectFsSpMetadataList,
//   selectFsReportCodeList,
//   selectFsProcedureList,
// };
