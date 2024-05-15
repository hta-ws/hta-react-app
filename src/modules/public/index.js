import React from 'react';
import { RoutePermittedRole } from 'shared/AppEnums';

const HomePage = React.lazy(() => import('./Home'));

// Route Configuration for admin module
export const publicPagesConfigs = [
  {
    permittedRole: RoutePermittedRole.user,
    path: '/anasayfa',
    element: <HomePage />,
  },
];
