import React from 'react';
import { RoutePermittedRole } from 'shared/AppEnums';

// FormulaDefinition Lazy Import
const FormulaDefinitionPage = React.lazy(
  () => import('./Financial/Definitions/FormulaDefinition'),
);

// Existing Lazy Imports
const ReportCodePopulationPage = React.lazy(
  () => import('./Financial/Reports/Population'),
);
const ReportCodeFormulasPage = React.lazy(
  () => import('./Financial/Reports/Formulas'),
);
const TaskSchedulerPage = React.lazy(
  () => import('./Scheduler/TaskSchedulerPage'),
);
const TaskSchedulerLogPage = React.lazy(
  () => import('./Scheduler/TaskSchedulerLogPage'),
);
const IsYatirimMappingPage = React.lazy(
  () => import('./Financial/IsYatirimMapping'),
);

const CodeDefinitionPage = React.lazy(
  () => import('./Financial/Definitions/CodeDefinition'),
);

// Route Configuration for admin module
export const adminPagesConfigs = [
  {
    permittedRole: RoutePermittedRole.admin,
    path: '/admin/task/log/:id',
    element: <TaskSchedulerLogPage />,
  },
  {
    permittedRole: RoutePermittedRole.admin,
    path: '/admin/task/log',
    element: <TaskSchedulerLogPage />,
  },
  {
    permittedRole: RoutePermittedRole.admin,
    path: '/admin/task/:viewmode/:id',
    element: <TaskSchedulerPage />,
  },
  {
    permittedRole: RoutePermittedRole.admin,
    path: '/admin/task/:viewmode',
    element: <TaskSchedulerPage />,
  },
  {
    permittedRole: RoutePermittedRole.admin,
    path: '/admin/isyatirim-mapping',
    element: <IsYatirimMappingPage />,
  },
  {
    permittedRole: RoutePermittedRole.admin,
    path: '/admin/isyatirim-mapping/:viewmode',
    element: <IsYatirimMappingPage />,
  },
  {
    permittedRole: RoutePermittedRole.admin,
    path: '/admin/financial-result-management/report-code-population-definitions',
    element: <ReportCodePopulationPage />,
  },
  {
    permittedRole: RoutePermittedRole.admin,
    path: '/admin/financial-result-management/report-code-formula-definitions',
    element: <ReportCodeFormulasPage />,
  },
  {
    permittedRole: RoutePermittedRole.admin,
    path: '/admin/financial-result-management/code-definition',
    element: <CodeDefinitionPage />,
  },
  {
    permittedRole: RoutePermittedRole.admin,
    path: '/admin/financial-result-management/code-definition/:template',
    element: <CodeDefinitionPage />,
  },
  {
    permittedRole: RoutePermittedRole.admin,
    path: '/admin/financial-result-management/code-definition/:template/:id',
    element: <CodeDefinitionPage />,
  },
  {
    permittedRole: RoutePermittedRole.admin,
    path: '/admin/financial-result-management/formula-definition',
    element: <FormulaDefinitionPage />,
  },
  {
    permittedRole: RoutePermittedRole.admin,
    path: '/admin/financial-result-management/formula-definition/:template',
    element: <FormulaDefinitionPage />,
  },
  {
    permittedRole: RoutePermittedRole.admin,
    path: '/admin/financial-result-management/formula-definition/:template/:id',
    element: <FormulaDefinitionPage />,
  },
];
