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

/**
 * Interface for the 'Config' data
 */
export interface ConfigEntity {
  coreApplications: IMicroFrontendConfig[] | null;
  navigation: INavigation | null;
}

export interface IApplicationConfigResponce {
  // TODO
  data: IMicroFrontendConfig[];
}

export interface INavigationResponse {
  message: string;
  data: INavigation;
}

export interface INavigation {
  ttLogo: string;
  customLogo: string;
  defaultRoute: string;
  collapsed: boolean;
  menus: Menu;
}

export interface Menu {
  topOrder: MenuItem[];
  bottomOrder: MenuItem[];
}

export interface MenuItem {
  title: string;
  routePath?: string;
  icon?: string;
  child?: MenuItem[];
  fragment?: string;
}
