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
