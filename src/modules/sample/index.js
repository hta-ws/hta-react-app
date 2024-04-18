import React from 'react';
import { RoutePermittedRole } from 'shared/AppEnums';

const DashBoard = React.lazy(() => import('./Dashboard'));

export const samplePagesConfigs = [
  {
    permittedRole: RoutePermittedRole.User,
    path: '/son-bilancolar',
    element: <DashBoard />,
  },
];
