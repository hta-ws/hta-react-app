import React from 'react';
import { RoutePermittedRole } from 'shared/AppEnums';

// Admin Modules Lazy Imports
// const BalanceSheetDataPage = React.lazy(
//   () => import('./FinancialDataManagement/BalanceSheetDataPage'),
// );
// const CashFlowDataPage = React.lazy(
//   () => import('./FinancialDataManagement/CashFlowDataPage'),
// );
// const IncomeStatementDataPage = React.lazy(
//   () => import('./FinancialDataManagement/IncomeStatementDataPage'),
// );
// const IfrsCodeCalculationsPage = React.lazy(
//   () => import('./FinancialCalculationManagement/IfrsCodeCalculationsPage'),
// );
// const IfrsCodeDefinitionsPage = React.lazy(
//   () => import('./FinancialCalculationManagement/IfrsCodeDefinitionsPage'),
// );

// const EditorPage = React.lazy(() => import('./Financial/Editor'));
// const PresentationPage = React.lazy(() => import('./Financial/Presentation'));
// const ReportDefinitionsPage = React.lazy(
//   () => import('./Financial/Reports/Definitions'),
// );
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
  //   {
  //     permittedRole: RoutePermittedRole.admin,
  //     path: '/admin/financial-data-management/cash-flow',
  //     element: <CashFlowDataPage />,
  //   },
  //   {
  //     permittedRole: RoutePermittedRole.admin,
  //     path: '/admin/financial-data-management/income-statement',
  //     element: <IncomeStatementDataPage />,
  //   },
  //   {
  //     permittedRole: RoutePermittedRole.admin,
  //     path: '/admin/financial-result-management/ifrs-calculations',
  //     element: <IfrsCodeCalculationsPage />,
  //   },
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

  // {
  //   permittedRole: RoutePermittedRole.admin,
  //   path: '/admin/financial/editor',
  //   element: <EditorPage />,
  // },
  // {
  //   permittedRole: RoutePermittedRole.admin,
  //   path: '/admin/financial/presentation',
  //   element: <PresentationPage />,
  // },
  // {
  //   permittedRole: RoutePermittedRole.admin,
  //   path: '/admin/financial/reports/definitions',
  //   element: <ReportDefinitionsPage />,
  // },
];
