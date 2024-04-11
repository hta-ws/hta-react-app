import React from 'react';
import { RoutePermittedRole } from '@veo/constants/AppEnums';

const TradingViewWidget = React.lazy(
  () => import('../../../modules/sample/TradingViewWidget'),
);
const Page2 = React.lazy(() => import('../../../modules/sample/Page2'));

export const samplePagesConfigsdddd = [
  {
    permittedRole: RoutePermittedRole.Admin,
    path: '/TradingViewWidget',
    element: <TradingViewWidget />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: '/sample/page-2',
    element: <Page2 />,
  },
];
