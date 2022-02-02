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
  navigation: ISideNavigation | null;
}

export interface IApplicationConfigResponce {
  // ToDo
  data: IMicroFrontendConfig[];
}

export interface ISideNavigationResponse {
  message: string;
  data: ISideNavigation;
}

export interface ISideNavigation {
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
