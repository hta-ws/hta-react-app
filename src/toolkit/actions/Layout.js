import {
  SET_INITIAL_PATH,
  CHANGE_LAYOUT,
  TOGGLE_NAV_COLLAPSED,
  CHANGE_SIDEBAR_THEME,
  CHANGE_LAYOUT_MODE,
  CHANGE_LAYOUT_WIDTH,
  CHANGE_LAYOUT_POSITION_TYPE,
  CHANGE_LAYOUT_LEFT_SIDEBAR_SIZE_TYPE,
  CHANGE_SIDEBAR_VISIBILITY_TYPE,
  TOGGLE_MENU, // Menü toggle için action type
  SET_MENU_ITEMS,
} from 'shared/ActionTypes';
import { changeHTMLAttribute } from '@hta/helpers/Utils';

// Navigation collapse toggle action
export const toggleNavCollapsed = () => {
  return (dispatch) => dispatch({ type: TOGGLE_NAV_COLLAPSED });
};

// Set the initial path action
export const setInitialPath = (initialPath) => {
  return {
    type: SET_INITIAL_PATH,
    payload: initialPath,
  };
};

// Change layout type action
export const changeLayout = (layout) => async (dispatch) => {
  try {
    if (layout === 'twocolumn') {
      document.documentElement.removeAttribute('data-layout-width');
    } else if (layout === 'horizontal') {
      document.documentElement.removeAttribute('data-sidebar-size');
    } else if (layout === 'semibox') {
      changeHTMLAttribute('data-layout-width', 'fluid');
      changeHTMLAttribute('data-layout-style', 'default');
    }
    changeHTMLAttribute('data-layout', layout);
    dispatch({ type: CHANGE_LAYOUT, payload: layout });
  } catch (error) {
    console.error('Error changing layout:', error);
  }
};

// Change sidebar theme action
export const changeSidebarTheme = (layoutMode) => async (dispatch) => {
  try {
    changeHTMLAttribute('data-sidebar', layoutMode);
    dispatch({ type: CHANGE_SIDEBAR_THEME, payload: layoutMode });
  } catch (error) {
    console.error('Error changing sidebar theme:', error);
  }
};

// Change layout mode action
export const changeLayoutMode = (layoutMode) => async (dispatch) => {
  try {
    changeHTMLAttribute('data-bs-theme', layoutMode);
    dispatch({ type: CHANGE_LAYOUT_MODE, payload: layoutMode });
  } catch (error) {
    console.error('Error changing layout mode:', error);
  }
};

// Change layout width action
export const changeLayoutWidth = (layoutWidth) => async (dispatch) => {
  try {
    const widthType = layoutWidth === 'lg' ? 'fluid' : 'boxed';
    changeHTMLAttribute('data-layout-width', widthType);
    dispatch({ type: CHANGE_LAYOUT_WIDTH, payload: layoutWidth });
  } catch (error) {
    console.error('Error changing layout width:', error);
  }
};

// Change layout position action
export const changeLayoutPosition = (layoutPosition) => async (dispatch) => {
  try {
    changeHTMLAttribute('data-layout-position', layoutPosition);
    dispatch({ type: CHANGE_LAYOUT_POSITION_TYPE, payload: layoutPosition });
  } catch (error) {
    console.error('Error changing layout position:', error);
  }
};

// Change left sidebar size type action
export const changeLeftSidebarSizeType =
  (leftSidebarSizeType) => async (dispatch) => {
    try {
      changeHTMLAttribute('data-sidebar-size', leftSidebarSizeType);
      dispatch({
        type: CHANGE_LAYOUT_LEFT_SIDEBAR_SIZE_TYPE,
        payload: leftSidebarSizeType,
      });
    } catch (error) {
      console.error('Error changing left sidebar size:', error);
    }
  };

// Change sidebar visibility action
export const changeSidebarVisibility =
  (sidebarVisibilityType) => async (dispatch) => {
    try {
      changeHTMLAttribute('data-sidebar-visibility', sidebarVisibilityType);
      dispatch({
        type: CHANGE_SIDEBAR_VISIBILITY_TYPE,
        payload: sidebarVisibilityType,
      });
    } catch (error) {
      console.error('Error changing sidebar visibility:', error);
    }
  };

// Toggle menu action
export const toggleMenu = (menuId) => ({
  type: TOGGLE_MENU,
  payload: menuId,
});

// Menü öğelerini set etmek için action creator
export const setMenuItems = (menuItems) => ({
  type: SET_MENU_ITEMS,
  payload: menuItems,
});
