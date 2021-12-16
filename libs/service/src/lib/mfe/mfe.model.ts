import { LoadRemoteModuleOptions } from '@angular-architects/module-federation';

export interface IMicroFrontendConfig extends LoadRemoteModuleOptions {
  id: string;
  routePath: string;
  ngModuleName: string;
  companyType: string;
  pathMatch?: string;
  subscription: string;
  canActivate?: string[];
  canDeactivate?: string[];
}
