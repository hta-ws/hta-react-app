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
} from 'shared/ActionTypes';
import { MenuData } from 'shared/MenuData';
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
    });
});

export default layoutReducer;
