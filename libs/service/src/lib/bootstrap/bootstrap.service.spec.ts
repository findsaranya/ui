import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as appConfig from '../+state/app';
import { appsWithAuth } from '../+state/app/config.data';
import * as Auth from '../+state/auth';
import { UserConfig } from '../+state/auth/auth.data';

import { BootstrapService } from './bootstrap.service';

jest.mock('@angular-architects/module-federation-runtime/', () => ({
  loadRemoteModule: jest.fn((moduleName: string) => {
    return new Promise((resolve) => {
      resolve(moduleName);
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
      expect(service.initialRoutes.length).toBeGreaterThan(0);
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
      expect(service.initialRoutes.length).toBeGreaterThan(0);
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
      // ToDo check appInitialized not called
    });
    it('Router config reset exception', () => {
      mockStore.setState({
        ...state,
        appConfig: {
          ...state.appConfig,
          coreApplications: null,
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
