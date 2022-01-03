import { LoadRemoteModuleOptions } from '@angular-architects/module-federation';

export interface IMicroFrontendConfig extends LoadRemoteModuleOptions {
  id: string;
  routePath: string;
  ngModuleName: string;
  companyType: string | null;
  pathMatch?: string;
  subscription: string | null;
  canActivate?: string[];
  canDeactivate?: string[];
}
