import { IMicroFrontendConfig } from '../../mfe/mfe.model';

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

export const errorMessage = 'Failed to load application config';
export const apiBaseUrl = 'http://localhost:5000/';
