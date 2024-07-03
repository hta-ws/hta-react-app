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
