// src/data/menuData.js
export const MenuData = [
  {
    id: 'Anasayfa',
    label: 'Anasayfa',
    icon: 'ri-home-8-line',
    link: '/anasayfa',
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
        label: 'Özet',
        link: '/hisse/ozet',
        roles: ['admin', 'user'], // Sadece admin erişebilir
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
    roles: ['admin'], // Hem admin hem de user erişebilir
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
            label: 'Kod tan8ımları yenı',
            link: '/admin/financial-result-management/code-definition',
            roles: ['admin', 'user'], // Hem admin hem de user erişebilir
          },
          {
            id: 'kssk',
            label: 'Yenı Formul tanımlama ',
            link: '/admin/financial-result-management/formula-definition',
            roles: ['admin', 'user'], // Hem admin hem de user erişebilir
          },
        ],
      },
      {
        id: 'task',

        label: 'İş Günlügü ',
        link: '#',
        roles: ['admin', 'user'], // Sadece admin erişebilir
        subItems: [
          {
            id: 'task-edit',
            label: 'İş Günlügü Listesi',
            link: '/admin/task/list',
            roles: ['admin'], // Sadece admin erişebilir
          },
        ],
      },
      {
        id: 'isyatirim-mapping',
        label: 'İsyatirim Eşleme',
        link: '/admin/isyatirim-mapping',
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
