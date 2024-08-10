import { createSelector } from '@reduxjs/toolkit';

// Menü öğelerini almak için state'den gerekli alanları seçiyoruz
const getMenuItems = (state) => state.layout.menuItems;

export const getVisibleMenuItems = createSelector(
  [getMenuItems, (state, userRole) => userRole],
  (menuItems, userRole) =>
    menuItems.filter((item) => {
      // Eğer item.roles tanımlı değilse veya boşsa, bu item'ı filtrelemeye dahil etmiyoruz.
      if (!item.roles || item.roles.length === 0) {
        return false;
      }
      // Eğer item.roles tanımlı ve userRole içeriyorsa, bu item'ı filtrelemeye dahil ediyoruz.
      return item.roles.includes(userRole);
    }),
);
