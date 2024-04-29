import { createSelector } from '@reduxjs/toolkit';
// import { useAuthUser } from '@hta/hooks/AuthHooks';

//const getUserRole = (state) => state.user.role; // Kullanıcı rolünü buradan alın

// const GetUserRole = () => {
//   // const { user } = useAuthUser();
//   return 'admin';
// };

const getMenuItems = (state) => state.layout.menuItems;

// Bu selector, tüm menü öğelerini alır ve kullanıcı rolüne göre filtreleme yapar.
export const getVisibleMenuItems = createSelector(
  [getMenuItems, (state, userRole) => userRole],
  (menuItems, userRole) =>
    menuItems.filter((item) => item.roles.includes(userRole)),
);
// export const getVisibleMenuItems = createSelector(
//   [getMenuItems, GetUserRole],
//   (menuItems, role) => {
//     return menuItems.filter((item) => item.roles.includes(role));
//   },
// );
