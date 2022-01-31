import { Params } from '@angular/router';

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
  queryParams?: Params;
}

export const sideNavSampleData: ISideNavigation = {
  collapsed: true,
  ttLogo: 'tt-logo.svg',
  customLogo: '',
  defaultRoute: 'settings',
  menus: {
    topOrder: [
      {
        title: 'Dashboard',
        routePath: '/',
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
