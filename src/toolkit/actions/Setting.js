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
} from 'shared/ActionTypes';
import { changeHTMLAttribute } from '@hta/helpers/Utils';

export const toggleNavCollapsed = () => {
  return (dispatch) => dispatch({ type: TOGGLE_NAV_COLLAPSED });
};

// export const setInitialPath = (initialPath) => {
//   return (dispatch) =>
//     dispatch({ type: SET_INITIAL_PATH, payload: initialPath });
// };

// Actions

export const setInitialPath = (initialPath) => {
  return {
    type: SET_INITIAL_PATH,
    payload: initialPath,
  };
};

/**
 * Changes the layout type
 * @param {*} param0
 */
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
    // console.log(error);
  }
};
/**
 * Changes the left sidebar theme
 * @param {*} param0
 */
export const changeSidebarTheme = (layoutMode) => async (dispatch) => {
  try {
    changeHTMLAttribute('data-sidebar', layoutMode);

    dispatch({ type: CHANGE_SIDEBAR_THEME, payload: layoutMode });
  } catch (error) {
    // console.log(error);
  }
};

/**
 * Changes the layout mode
 * @param {*} param0
 */
export const changeLayoutMode = (layoutMode) => async (dispatch) => {
  try {
    changeHTMLAttribute('data-bs-theme', layoutMode);
    dispatch({ type: CHANGE_LAYOUT_MODE, payload: layoutMode });
  } catch (error) {
    // console.log(error);
  }
};

/**
 * Changes the layout width
 * @param {*} param0
 */
export const changeLayoutWidth = (layoutWidth) => async (dispatch) => {
  try {
    if (layoutWidth === 'lg') {
      changeHTMLAttribute('data-layout-width', 'fluid');
    } else {
      changeHTMLAttribute('data-layout-width', 'boxed');
    }
    dispatch({ type: CHANGE_LAYOUT_WIDTH, payload: layoutWidth });
  } catch (error) {
    return error;
  }
};

/**
 * Changes the layout position
 * @param {*} param0
 */
export const changeLayoutPosition = (layoutposition) => async (dispatch) => {
  try {
    changeHTMLAttribute('data-layout-position', layoutposition);
    dispatch({ type: CHANGE_LAYOUT_POSITION_TYPE, payload: layoutposition });
  } catch (error) {
    // console.log(error);
  }
};

/**
 * Changes the topbar themes
 * @param {*} param0
 */
export const changeLeftSidebarSizeType =
  (leftsidebarSizetype) => async (dispatch) => {
    try {
      switch (leftsidebarSizetype) {
        case 'lg':
          changeHTMLAttribute('data-sidebar-size', 'lg');
          break;
        case 'md':
          changeHTMLAttribute('data-sidebar-size', 'md');
          break;
        case 'sm':
          changeHTMLAttribute('data-sidebar-size', 'sm');
          break;
        case 'sm-hover':
          changeHTMLAttribute('data-sidebar-size', 'sm-hover');
          break;
        default:
          changeHTMLAttribute('data-sidebar-size', 'lg');
      }
      dispatch({
        type: CHANGE_LAYOUT_LEFT_SIDEBAR_SIZE_TYPE,
        payload: leftsidebarSizetype,
      });
    } catch (error) {
      // console.log(error);
    }
  };
/**
 * Changes the sidebar visibility
 * @param {*} param0
 */
export const changeSidebarVisibility =
  (sidebarVisibilitytype) => async (dispatch) => {
    try {
      changeHTMLAttribute('data-sidebar-visibility', sidebarVisibilitytype);
      dispatch({
        type: CHANGE_SIDEBAR_VISIBILITY_TYPE,
        payload: sidebarVisibilitytype,
      });
    } catch (error) {
      // console.log(error);
    }
  };

// export const changeLayoutModeAction = (layoutMode) => {
//   return {
//     type: CHANGE_LAYOUT_MODE_ACTION,
//     payload: layoutMode,
//   };
// };

// export const changeSidebarThemeAction = (theme) => {
//   return {
//     type: CHANGE_SIDEBAR_THEME_ACTION,
//     payload: theme,
//   };
// };

// export const changeLayoutWidthAction = (layoutWidth) => {
//   return {
//     type: CHANGE_LAYOUT_WIDTH_ACTION,
//     payload: layoutWidth,
//   };
// };
