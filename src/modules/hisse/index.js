import React from 'react';
import { RoutePermittedRole } from 'shared/AppEnums';

const OzetPage = React.lazy(() => import('./Ozet'));

// Route Configuration for admin module
export const hissePagesConfigs = [
  {
    permittedRole: RoutePermittedRole.user,
    path: '/hisse/ozet',
    element: <OzetPage />,
  },
];
