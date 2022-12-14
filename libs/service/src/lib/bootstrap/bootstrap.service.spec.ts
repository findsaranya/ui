import { LoadRemoteModuleOptions } from '@angular-architects/module-federation-runtime';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as appConfig from '../+state/app';
import { appsWithAuth, sideNavSampleData } from '../+state/app/config.data';
import * as Auth from '../+state/auth';
import { UserConfig } from '../+state/auth/auth.data';

import { BootstrapService } from './bootstrap.service';

jest.mock('@angular-architects/module-federation-runtime/', () => ({
  loadRemoteModule: jest.fn((data: LoadRemoteModuleOptions) => {
    return new Promise((resolve) => {
      resolve({
        RemoteEntryModule: data.remoteName,
      });
    });
  }),
}));

describe('BootstrapService', () => {
  let service: BootstrapService;
  const state: {
    appConfig: appConfig.State;
    auth: Auth.State;
  } = {
    appConfig: {
      ...appConfig.initialState,
      loaded: true,
      coreApplications: appsWithAuth,
      navigation: sideNavSampleData,
    },
    auth: {
      ...Auth.initialState,
      loggedIn: true,
      loaded: true,
      token: 'JWT',
      userConfig: UserConfig,
    },
  };
  const route: Routes = [
    {
      path: 'error',
      redirectTo: '',
    },
  ];
  let config = route;

  const mockRouter = {
    navigate: jest.fn(([data]) => {
      const route = config.find((d) => d.path === data);
      (route?.loadChildren?.() as Promise<string>)?.then((d) => d);
    }),
    config,
    resetConfig: (cf: Routes) => {
      config = cf;
      return config;
    },
  };

  const mockActivatedRoute = {
    snapshot: {
      queryParams: {
        next: 'auth',
      },
    },
  };

  describe('Auth and application config load success with next url', () => {
    let mockStore: MockStore<{
      appConfig: appConfig.State;
      auth: Auth.State;
    }>;

    beforeAll(() => {
      TestBed.configureTestingModule({
        providers: [
          BootstrapService,
          provideMockStore({
            initialState: state,
          }),
          { provide: Router, useValue: mockRouter },
          { provide: ActivatedRoute, useValue: mockActivatedRoute },
        ],
      });
      mockStore = TestBed.inject(MockStore);
      service = TestBed.inject(BootstrapService);
    });

    it('should call init method and start the application', () => {
      service.init();
      expect(service.appInitialized).not.toBeUndefined();
      expect(service.appConfigLoaded).toBeTruthy();
      expect(service.loadedRoutes.child.length).toEqual(2);
      expect(service.loadedRoutes.root.length).toEqual(1);
      expect(service.initialRoutes.length).toEqual(1);
    });

    it('should handle the logout event', () => {
      expect(service.loginLogoutLoaded).toBeFalsy();
      mockStore.setState({
        ...state,
        auth: {
          authenticating: false,
          loaded: true,
          loggedIn: false,
          token: null,
          userConfig: null,
        },
      });
      expect(service.loginLogoutLoaded).toBeFalsy();
      expect(service.appConfigLoaded).toBeTruthy();
    });
  });
  describe('Auth and application config load success without next url', () => {
    const mockResponse = jest.fn();
    Object.defineProperty(window, 'location', {
      value: {
        hash: {
          endsWith: mockResponse,
          includes: mockResponse,
        },
        assign: mockResponse,
      },
      writable: true,
    });
    beforeAll(() => {
      TestBed.configureTestingModule({
        providers: [
          BootstrapService,
          provideMockStore({
            initialState: state,
          }),
          { provide: Router, useValue: mockRouter },
          { provide: ActivatedRoute, useValue: mockActivatedRoute },
        ],
      });
      service = TestBed.inject(BootstrapService);
      mockActivatedRoute.snapshot.queryParams['next'] = '';
      window.location.pathname = '/login';
    });

    it('should call init method and start the application without next url ', () => {
      service.init();
      expect(service.appInitialized).not.toBeUndefined();
      expect(service.appConfigLoaded).toBeTruthy();
      expect(service.loadedRoutes.child.length).toEqual(2);
      expect(service.loadedRoutes.root.length).toEqual(1);
      expect(service.initialRoutes.length).toEqual(1);
    });

    it('Should verify the root & child routes', () => {
      (service.loadedRoutes.child[0].loadChildren?.() as Promise<unknown>).then(
        (d) => {
          const toStr = String(d);
          expect(toStr.includes('NotSubscribedModule')).toBeTruthy();
        }
      );
      (service.loadedRoutes.child[1].loadChildren?.() as Promise<unknown>).then(
        (d) => {
          const toStr = String(d);
          expect(toStr.includes(appsWithAuth[2].remoteName)).toBeTruthy();
        }
      );
      (service.loadedRoutes.root[0].loadChildren?.() as Promise<unknown>).then(
        (d) => {
          const toStr = String(d);
          expect(toStr.includes(appsWithAuth[0].remoteName)).toBeTruthy();
        }
      );
    });
  });

  describe('Auth with application config loaded but has error', () => {
    beforeAll(() => {
      TestBed.configureTestingModule({
        providers: [
          BootstrapService,
          provideMockStore({
            initialState: {
              ...state,
              appConfig: {
                coreApplications: null,
                loaded: true,
                error: 'Failed to load the application',
                navigation: null,
              } as appConfig.State,
            },
          }),
          { provide: Router, useValue: mockRouter },
          { provide: ActivatedRoute, useValue: mockActivatedRoute },
        ],
      });
      service = TestBed.inject(BootstrapService);
    });
    it('Application config not loaded [Stop the observable callback]', () => {
      service.init();
      expect(service.appConfigLoaded).toBeFalsy();
      expect(service.loginLogoutLoaded).toBeFalsy();
      expect(service.appInitialized).not.toBeUndefined();
      expect(mockRouter.navigate).toBeCalled();
    });
  });
  describe('Auth with application config exceptions || fallback', () => {
    let mockStore: MockStore<{
      appConfig: appConfig.State;
      auth: Auth.State;
    }>;
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          BootstrapService,
          provideMockStore({
            initialState: {
              ...state,
              appConfig: {
                coreApplications: null,
                navigation: null,
                loaded: false,
              } as appConfig.State,
            },
          }),
          { provide: Router, useValue: mockRouter },
          { provide: ActivatedRoute, useValue: mockActivatedRoute },
        ],
      });
      mockStore = TestBed.inject(MockStore);

      service = TestBed.inject(BootstrapService);
    });
    it('Application config not loaded [Stop the observable callback]', () => {
      service.init();
      expect(service.appConfigLoaded).toBeFalsy();
      expect(service.loginLogoutLoaded).toBeFalsy();
      expect(service.appInitialized).not.toBeUndefined();
      // TODO check appInitialized not called
    });
    it('Router config reset exception', () => {
      mockStore.setState({
        ...state,
        appConfig: {
          ...state.appConfig,
          coreApplications: null,
          navigation: null,
        },
      });

      service.init();
      expect(service.appConfigLoaded).toBeTruthy();
      expect(service.loginLogoutLoaded).toBeFalsy();
      expect(service.appInitialized).not.toBeUndefined();
      expect(mockRouter.navigate).toBeCalled();
    });
  });
});
