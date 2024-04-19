import React from 'react';
import { RoutePermittedRole } from 'shared/AppEnums';

// Admin Modules Lazy Imports
const BalanceSheetDataPage = React.lazy(
  () => import('./FinancialDataManagement/BalanceSheetDataPage'),
);
const CashFlowDataPage = React.lazy(
  () => import('./FinancialDataManagement/CashFlowDataPage'),
);
const IncomeStatementDataPage = React.lazy(
  () => import('./FinancialDataManagement/IncomeStatementDataPage'),
);
const IfrsCodeCalculationsPage = React.lazy(
  () => import('./FinancialCalculationManagement/IfrsCodeCalculationsPage'),
);
const IfrsCodeDefinitionsPage = React.lazy(
  () => import('./FinancialCalculationManagement/IfrsCodeDefinitionsPage'),
);

const EditorPage = React.lazy(() => import('./Financial/Editor'));
const PresentationPage = React.lazy(() => import('./Financial/Presentation'));
const ReportDefinitionsPage = React.lazy(
  () => import('./Financial/Reports/Definitions'),
);
const ReportFormulasPage = React.lazy(
  () => import('./Financial/Reports/Formulas'),
);

// const FinancialRatiosManagementPage = React.lazy(
//   () =>
//     import('./FinancialCalculationManagement/FinancialRatiosManagementPage'),
// );
// const StockSettingsPage = React.lazy(
//   () => import('./admin/StockManagement/StockSettingsPage'),
// );
// const TaskSchedulerPage = React.lazy(
//   () => import('/admin/Scheduler/TaskSchedulerPage'),
// );

// Route Configuration for admin module
export const adminPagesConfigs = [
  {
    permittedRole: RoutePermittedRole.admin,
    path: '/admin/financial-data-management/balance-sheet',
    element: <BalanceSheetDataPage />,
  },
  {
    permittedRole: RoutePermittedRole.admin,
    path: '/admin/financial-data-management/cash-flow',
    element: <CashFlowDataPage />,
  },
  {
    permittedRole: RoutePermittedRole.admin,
    path: '/admin/financial-data-management/income-statement',
    element: <IncomeStatementDataPage />,
  },
  {
    permittedRole: RoutePermittedRole.admin,
    path: '/admin/financial-result-management/ifrs-calculations',
    element: <IfrsCodeCalculationsPage />,
  },
  {
    permittedRole: RoutePermittedRole.admin,
    path: '/admin/financial-result-management/ifrs-definitions',
    element: <IfrsCodeDefinitionsPage />,
  },
  {
    permittedRole: RoutePermittedRole.admin,
    path: '/admin/financial/editor',
    element: <EditorPage />,
  },
  {
    permittedRole: RoutePermittedRole.admin,
    path: '/admin/financial/presentation',
    element: <PresentationPage />,
  },
  {
    permittedRole: RoutePermittedRole.admin,
    path: '/admin/financial/reports/definitions',
    element: <ReportDefinitionsPage />,
  },
  {
    permittedRole: RoutePermittedRole.admin,
    path: '/admin/financial/reports/formulas',
    element: <ReportFormulasPage />,
  },
  //   {
  //     permittedRole: RoutePermittedRole.admin,
  //     path: '/admin/financial-result-management/ratios-management',
  //     element: <FinancialRatiosManagementPage />,
  //   },
  //   {
  //     permittedRole: RoutePermittedRole.admin,
  //     path: '/admin/stock-management/settings',
  //     element: <StockSettingsPage />,
  //   },
  //   {
  //     permittedRole: RoutePermittedRole.admin,
  //     path: '/admin/scheduler',
  //     element: <TaskSchedulerPage />,
  //   },
  // Burada diğer admin route konfigürasyonlarınızı ekleyebilirsiniz.
];