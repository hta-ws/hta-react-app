import {
  SET_INITIAL_PATH,
  CHANGE_LAYOUT,
  CHANGE_SIDEBAR_THEME,
  CHANGE_LAYOUT_MODE,
  CHANGE_LAYOUT_WIDTH,
  CHANGE_LAYOUT_POSITION_TYPE,
  CHANGE_LAYOUT_LEFT_SIDEBAR_SIZE_TYPE,
  CHANGE_SIDEBAR_VISIBILITY_TYPE,
  TOGGLE_MENU,
  SET_MENU_ITEMS,
  SET_STOCK_CODE, // Add this new action type
} from 'shared/ActionTypes';
import { MenuData } from 'shared/MenuData';
import { StockMenuData } from 'shared/StockMenuData';
import { createReducer } from '@reduxjs/toolkit';
import {
  layoutTypes,
  leftSidebarTypes,
  layoutModeTypes,
  layoutWidthTypes,
  layoutPositionTypes,
  topbarThemeTypes,
  leftsidbarSizeTypes,
  leftSidebarViewTypes,
  leftSidebarImageTypes,
  preloaderTypes,
  sidebarVisibilitytypes,
} from 'shared/Layout';

const initialSettings = {
  initialPath: '/',
  layoutType: layoutTypes.TWOCOLUMN,
  leftSidebarType: leftSidebarTypes.DARK,
  layoutModeType: layoutModeTypes.LIGHTMODE,
  layoutWidthType: layoutWidthTypes.FLUID,
  layoutPositionType: layoutPositionTypes.FIXED,
  topbarThemeType: topbarThemeTypes.LIGHT,
  leftSidebarSizeType: leftsidbarSizeTypes.DEFAULT,
  leftSidebarViewType: leftSidebarViewTypes.DEFAULT,
  leftSidebarImageType: leftSidebarImageTypes.NONE,
  preloader: preloaderTypes.DISABLE,
  sidebarVisibilityType: sidebarVisibilitytypes.SHOW,
  menuItems: MenuData,
  activeMenus: {},
  stock_code: null, // Initialize stock_code as null
};

const replaceStockCodePlaceholders = (menuItems, stockCode) => {
  return menuItems.map((item) => {
    const newItem = { ...item };
    newItem.label = item.label.replace('{stock_code}', stockCode);
    newItem.link = item.link.replace('{stock_code}', stockCode);

    if (item.subItems) {
      newItem.subItems = replaceStockCodePlaceholders(item.subItems, stockCode);
    }

    return newItem;
  });
};

const layoutReducer = createReducer(initialSettings, (builder) => {
  builder
    .addCase(SET_INITIAL_PATH, (state, action) => {
      state.initialPath = action.payload;
    })
    .addCase(CHANGE_LAYOUT, (state, action) => {
      state.layoutType = action.payload;
    })
    .addCase(CHANGE_LAYOUT_MODE, (state, action) => {
      state.layoutModeType = action.payload;
    })
    .addCase(CHANGE_SIDEBAR_THEME, (state, action) => {
      state.leftSidebarType = action.payload;
    })
    .addCase(CHANGE_LAYOUT_WIDTH, (state, action) => {
      state.layoutWidthType = action.payload;
    })
    .addCase(CHANGE_LAYOUT_POSITION_TYPE, (state, action) => {
      state.layoutPositionType = action.payload;
    })
    .addCase(CHANGE_LAYOUT_LEFT_SIDEBAR_SIZE_TYPE, (state, action) => {
      state.leftSidebarSizeType = action.payload;
    })
    .addCase(CHANGE_SIDEBAR_VISIBILITY_TYPE, (state, action) => {
      state.sidebarVisibilitytype = action.payload;
    })
    .addCase(TOGGLE_MENU, (state, action) => {
      const menuId = action.payload;
      state.activeMenus[menuId] = !state.activeMenus[menuId];
    })
    .addCase(SET_MENU_ITEMS, (state, action) => {
      state.menuItems = action.payload;
    })
    .addCase(SET_STOCK_CODE, (state, action) => {
      state.stock_code = action.payload;

      // Replace stock code placeholders in StockMenuData
      const stockMenuItems = replaceStockCodePlaceholders(
        StockMenuData,
        state.stock_code,
      );

      // Find the index of the item with id 'stock-dashboard'
      const stockDashboardIndex = state.menuItems.findIndex(
        (item) => item.id === 'stock-dashboard',
      );

      if (stockDashboardIndex !== -1) {
        // Replace the existing item with stockMenuItems
        state.menuItems = [
          ...state.menuItems.slice(0, stockDashboardIndex),
          ...stockMenuItems,
          ...state.menuItems.slice(stockDashboardIndex + 1),
        ];
      } else {
        // If 'stock-dashboard' is not found, append stockMenuItems
        state.menuItems = [...state.menuItems, ...stockMenuItems];
      }
    });
});

export default layoutReducer;
