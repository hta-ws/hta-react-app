// src/data/menuData.js
export const MenuData = [
  {
    id: 'Anasayfa',
    label: 'Anasayfa',
    icon: 'ri-home-8-line',
    link: '/son-bilancolar',
    roles: ['admin', 'user'], // Sadece admin erişebilir
  },
  {
    id: 'hisse',
    label: 'Hisse Analizi',
    icon: 'ri-dashboard-line',
    link: '/dashboard',
    roles: ['admin', 'user'], // Hem admin hem de user erişebilir
    subItems: [
      {
        id: 'analytics',
        label: 'Analytics',
        link: '/dashboard/analytics',
        roles: ['admin'], // Sadece admin erişebilir
      },
      {
        id: 'reports',
        label: 'Reports',
        link: '/dashboard/reports',
        roles: ['admin', 'user'], // Hem admin hem de user erişebilir
      },
    ],
  },
  {
    id: 'admin',
    label: 'Yonetim Paneli',
    icon: 'ri-settings-3-line',
    link: '/dashboard',
    roles: ['admin', 'user'], // Hem admin hem de user erişebilir
    subItems: [
      {
        id: 'Bilanco Rasyo Hesaplamalrı',

        label: 'Rayolar Hesaplaması',
        link: '/admin/financial-data-management/balance-sheet',
        roles: ['admin', 'user'], // Sadece admin erişebilir
        subItems: [
          {
            id: 'kod-definitions',
            label: 'Kod Tanımları',
            link: '/admin/financial-result-management/report-code-population-definitions',
            roles: ['admin'], // Sadece admin erişebilir
          },
          {
            id: 'bilancodan-alinacak-kodlar',
            label: 'Formul tanımları',
            link: '/admin/financial-result-management/report-code-formula-definitions',
            roles: ['admin', 'user'], // Sadece admin erişebilir
          },
          {
            id: 'kk',
            label: 'Rasyo Formulleri',
            link: '/son-bilancolar',
            roles: ['admin', 'user'], // Hem admin hem de user erişebilir
          },
        ],
      },
      {
        id: 'bilanco',
        label: 'Bilanco',
        link: '/son-bilancolar',
        roles: ['admin', 'user'], // Hem admin hem de user erişebilir
      },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'ri-settings-3-line',
    link: '/son-bilancolar',
    roles: ['user'], // Sadece admin erişebilir
  },
];
