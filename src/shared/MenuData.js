// src/data/menuData.js
export const MenuData = [
  {
    id: 'Anasayfa',
    label: 'Ana Sayfa',
    icon: 'ri-home-8-line',
    link: '/anasayfa',
    roles: ['admin', 'user'],
  },
  {
    id: 'Ara',
    label: 'Arama',
    icon: ' ri-search-line',
    link: '/anasayfa',
    roles: ['admin', 'user'],
  },

  {
    id: 'stock-dashboard',
  },
  {
    label: 'Menu with Function',
    renderer: (props) => {
      return <div>{props.label}ğğğğğ</div>; // Bu öğe bir fonksiyon kullanacak
    },
  },

  {
    id: 'hisse',
    label: 'BOSSA',
    icon: 'ri-dashboard-line',
    link: '/dashboard',
    roles: ['admin', 'user'],

    subItems: [
      {
        label: 'Menu',
        isHeader: true,
      },
      {
        label: 'Menu with Function',
        renderer: (props) => {
          return <div>{props.label}ğğğğğ</div>; // Bu öğe bir fonksiyon kullanacak
        },
      },
      {
        id: 'analytics',
        label: 'Özet',
        link: '/hisse/ozet',
        roles: ['admin', 'user'],
      },
      {
        label: 'Menu',
        renderer: 'StockHeader', // Bu öğe özel bir renderer kullanacak
      },
      {
        id: 'reports',
        label: 'Reports',
        link: '/dashboard/reports',
        roles: ['admin', 'user'],
      },
    ],
  },
  {
    id: 'admin',
    label: 'Yonetim Paneli',
    icon: 'ri-settings-3-line',
    link: '/dashboard',
    roles: ['admin'],
    subItems: [
      {
        id: 'Bilanco Rasyo Hesaplamalrı',
        label: 'Rayolar Hesaplaması',
        link: '/admin/financial-data-management/balance-sheet',
        roles: ['admin', 'user'],
        subItems: [
          {
            id: 'kk',
            label: 'Kod Tanımları',
            link: '/admin/financial-result-management/code-definition',
            roles: ['admin', 'user'],
          },
          {
            id: 'kssk',
            label: 'Yeni Formül Tanımlama',
            link: '/admin/financial-result-management/formula-definition',
            roles: ['admin', 'user'],
          },
        ],
      },
      {
        id: 'task',
        label: 'İş Günlüğü',
        link: '#',
        roles: ['admin', 'user'],
        subItems: [
          {
            id: 'task-edit',
            label: 'İş Günlüğü Listesi',
            link: '/admin/task/list',
            roles: ['admin'],
          },
        ],
      },
      {
        id: 'isyatirim-mapping',
        label: 'İş Yatırım Eşleme',
        link: '/admin/isyatirim-mapping',
        roles: ['admin', 'user'],
      },
      {
        id: 'kk',
        label: 'Kod Tanımları',
        link: '/admin/financial-result-management/code-definition',
        roles: ['admin', 'user'],
      },
      {
        id: 'kssk',
        label: 'Yeni Formül Tanımlama',
        link: '/admin/financial-result-management/formula-definition',
        roles: ['admin', 'user'],
      },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'ri-settings-3-line',
    link: '/son-bilancolar',
    roles: ['user'],
  },
];
