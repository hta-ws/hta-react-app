export const StockMenuData = [
  {
    id: 'stock-dashboard',
    label: '{stock_code} Analizleri',
    icon: 'ri-stock-fill',
    link: '/stock/{stock_code}/dashboard',
    roles: ['admin', 'user'],
    subItems: [
      {
        id: 'stock-overview',
        label: 'Özet Rapor',
        link: '/stock/{stock_code}',
        roles: ['admin', 'user'],
      },
      {
        id: 'stock-reports',
        label: 'Şirket Bilgileri',
        link: '/stock/{stock_code}/sirket-bilgileri',
        roles: ['admin', 'user'],
      },
    ],
  },
];
