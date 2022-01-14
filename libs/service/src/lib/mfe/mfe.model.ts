import { LoadRemoteModuleOptions } from '@angular-architects/module-federation';

export interface IMicroFrontendConfig extends LoadRemoteModuleOptions {
  id: string;
  companyType: 'DEFAULT' | 'BRAND' | 'SUPPLIER';
  routePath: string;
  ngModuleName: string;
  subscribed: boolean;
  pathMatch?: string;
  canActivate?: string[];
  canDeactivate?: string[];
}
