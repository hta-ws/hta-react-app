import { createSelector } from '@reduxjs/toolkit';

const getMenuItems = (state) => state.layout.menuItems;
//const getUserRole = (state) => state.user.role; // Kullanıcı rolünü buradan alın
const getUserRole = () => 'user';
export const getVisibleMenuItems = createSelector(
  [getMenuItems, getUserRole],
  (menuItems, role) => {
    return menuItems.filter((item) => item.roles.includes(role));
  },
);
