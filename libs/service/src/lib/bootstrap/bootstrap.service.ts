import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, takeWhile } from 'rxjs';
import { AppState } from '../+state/app.store';
import * as Config from '../+state/app';
import * as Auth from '../+state/auth';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { IMicroFrontendConfig, INavigation } from '../+state/app/config.models';
import { loadRemoteModule } from '@angular-architects/module-federation-runtime/';

@Injectable()
export class BootstrapService {
  appInitialized!: (value: void | PromiseLike<void>) => void;
  appConfigLoaded = false;
  appConfig: (Observable<Config.State> | Observable<Auth.State>)[];
  loginLogoutLoaded = false;
  initialRoutes: Routes;
  loadedRoutes: { root: Routes; child: Routes } = {
    child: [],
    root: [],
  };
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.appConfig = [
      this.store.select('appConfig'),
      this.store.select('auth'),
    ];
    this.initialRoutes = this.router.config;
  }

  /**
   * init
   * @param envConfig
   * @returns
   */
  init(): Promise<void> {
    return new Promise((resolve) => {
      this.appInitialized = resolve;
      this.appConfigLoaded = false;

      // check authentication status -> callback mfe application config
      const callback = {
        success: [Config.initApplicationConfigWithAuth()],
        failure: [Config.initApplicationConfig()],
        logout: [Config.initApplicationConfig()],
      };
      this.store.dispatch(Auth.initSession({ callback }));
      this.listenConfigUpdates();
    });
  }

  private listenConfigUpdates(): void {
    this.appConfigLoaded = false;
    combineLatest(this.appConfig)
      .pipe(takeWhile(() => !this.appConfigLoaded))
      .subscribe((state) => {
        const [appConfig, auth] = state as [Config.State, Auth.State];
        if (!appConfig.loaded || auth.loggedIn === null) return;
        if (appConfig.error) {
          this.configErrorHandler(appConfig.error);
          return;
        }
        this.listenLoginLogout(!auth.loggedIn);
        this.appConfigLoaded = true;
        this.loadApplicationConfig(appConfig)
          .then(
            this.startApplication.bind(
              this,
              auth,
              appConfig.navigation as INavigation
            )
          )
          .catch(this.configErrorHandler.bind(this));
      });
  }

  private startApplication(auth: Auth.State, navigation: INavigation): void {
    const next = this.activatedRoute.snapshot.queryParams['next'];
    this.appInitialized();
    if (!auth.loggedIn) return;
    if (next) {
      this.router.navigate([next]);
      return;
    }
    if (
      window.location.pathname === '/' ||
      window.location.pathname === '/login'
    )
      // TODO Default landing page setup
      this.router.navigate([navigation.defaultRoute]);
  }

  private loadApplicationConfig(appConfig: Config.State): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.loadedRoutes = this.buildRoutes(
          appConfig.coreApplications as IMicroFrontendConfig[]
        );
        this.router.resetConfig([
          ...this.loadedRoutes.root,
          ...this.initialRoutes,
        ]);
        resolve();
      } catch (e) {
        reject('Failed to load application routes');
      }
    });
  }

  private buildRoutes(options: IMicroFrontendConfig[]): {
    root: Routes;
    child: Routes;
  } {
    const root: Routes = [];
    const child: Routes = [];

    options.forEach((option) => {
      const path = option.routePath;
      if (option.companyType !== 'DEFAULT') {
        child.push({
          path,
          loadChildren: () =>
            !option.subscribed
              ? import('@tt-webapp/ui/not-subscribed').then(
                  (m) => m.NotSubscribedModule
                )
              : loadRemoteModule(option).then((m) => m[option.ngModuleName]),
        });
      } else {
        root.push({
          path,
          loadChildren: () =>
            loadRemoteModule(option).then((m) => m[option.ngModuleName]),
        });
      }
    });
    return { root, child };
  }

  private configErrorHandler(error: string): void {
    this.router.navigate(['error'], {
      queryParams: {
        message: error,
        prev: this.router.url,
      },
    });
    this.appInitialized();
  }

  private listenLoginLogout(isLogin: boolean): void {
    this.loginLogoutLoaded = false;
    this.store
      .pipe(
        select(Auth.loggedIn),
        takeWhile(() => !this.loginLogoutLoaded)
      )
      .subscribe(this.initAppConfig.bind(this, isLogin));
  }

  private initAppConfig(expected: boolean, currentState: boolean | null): void {
    if (currentState !== expected) return;
    if (currentState === false) this.router.navigate(['login']);
    this.loginLogoutLoaded = true;
    this.listenConfigUpdates();
  }
}
