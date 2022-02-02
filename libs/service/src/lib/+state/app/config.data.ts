import { IMicroFrontendConfig, ISideNavigation } from './config.models';

export const apps: IMicroFrontendConfig[] = [
  {
    companyType: 'DEFAULT',
    exposedModule: './Module',
    id: 'AUTH',
    ngModuleName: 'RemoteEntryModule',
    remoteName: 'auth',
    routePath: 'auth',
    subscribed: false,
    remoteEntry: 'http://localhost:4201/remoteEntry.js',
  },
];

export const appsWithAuth: IMicroFrontendConfig[] = [
  ...apps,
  {
    companyType: 'SUPPLIER',
    exposedModule: './Module',
    id: 'settings',
    ngModuleName: 'RemoteEntryModule',
    remoteName: 'settings',
    routePath: 'settings',
    subscribed: false,
    remoteEntry: 'http://localhost:4202/remoteEntry.js',
  },
];

export const sideNavSampleData: ISideNavigation = {
  collapsed: true,
  ttLogo: 'tt-logo.svg',
  customLogo: '',
  defaultRoute: 'settings',
  menus: {
    topOrder: [
      {
        title: 'Dashboard',
        routePath: '',
        icon: 'dashboard',
      },
      {
        title: 'T-Trace',
        routePath: '/traceability',
        icon: 'traceability',
      },
      {
        title: 'T-EMS',
        routePath: '/evidences',
        icon: 'evidences',
      },
      {
        title: 'Assessments',
        routePath: '/assessments',
        icon: 'assessments',
      },
      {
        title: 'Transactions',
        routePath: '/transactions',
        icon: 'transactions',
      },
      {
        title: 'Suppliers',
        routePath: '/suppliers',
        icon: 'suppliers',
      },
    ],
    bottomOrder: [
      {
        title: 'Company Profile',
        icon: 'company',
        child: [
          {
            title: 'Basic Information',
            routePath: 'company/profile',
            fragment: 'basic-information',
          },
          {
            title: 'Facilities',
            routePath: 'company/profile',
            fragment: 'facilities',
          },
        ],
      },
      {
        title: 'Settings',
        icon: 'settings',
        routePath: '/settings',
      },
      {
        title: 'Logout',
        icon: 'logout',
        routePath: '/logout',
      },
    ],
  },
};

export const errorMessage = 'Failed to load application config';
export const apiBaseUrl = 'http://localhost:5000/';
