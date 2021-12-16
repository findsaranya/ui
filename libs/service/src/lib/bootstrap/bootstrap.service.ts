import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, takeWhile } from 'rxjs';
import { AppState } from '../+state/app.store';
import * as App from '../+state/app';
import { Router, Routes } from '@angular/router';
import { IMicroFrontendConfig } from '../mfe/mfe.model';
import { loadRemoteModule } from '@angular-architects/module-federation';

@Injectable({
  providedIn: 'root',
})
export class BootstrapService {
  appInitialized: ((value: void | PromiseLike<void>) => void) | undefined;
  env: unknown;
  appConfigLoaded = false;

  constructor(private store: Store<AppState>, private router: Router) {}

  /**
   * init
   * @param envConfig
   * @returns
   */
  init(envConfig: unknown): Promise<void> {
    return new Promise((resolve) => {
      this.appInitialized = resolve;
      this.env = envConfig;
      this.routesLoader();

      this.store.dispatch(App.init());
      this.navigator();
    });
  }

  navigator() {
    const appData = [this.store.select('appConfig')];
    combineLatest(appData)
      .pipe(takeWhile(() => !this.appConfigLoaded))
      .subscribe((appConfig) => {
        if (!appConfig[0].loaded) return;
        this.appConfigLoaded = true;
        this.appInitialized?.();
      });
  }

  routesLoader() {
    const apps: IMicroFrontendConfig[] = [
      {
        companyType: null,
        exposedModule: './Module',
        id: 'AUTH',
        ngModuleName: 'RemoteEntryModule',
        remoteName: 'auth',
        routePath: 'auth',
        subscription: null,
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
      },
    ];
    this.router.resetConfig([...this.buildRoutes(apps), ...this.router.config]);
  }

  buildRoutes(options: IMicroFrontendConfig[]): Routes {
    const routes: Routes = options.map((d) => ({
      path: d.routePath,
      loadChildren: () => loadRemoteModule(d).then((m) => m[d.ngModuleName]),
    }));
    return routes;
  }

  baseConfigErrorHandler() {
    // Todo
  }

  authConfigErrorHandler() {
    // Todo
  }
}
