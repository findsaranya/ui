import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { takeWhile } from 'rxjs';
import { AppState } from '../+state/app.store';
import * as AppConfig from '../+state/app';
import * as Auth from '../+state/auth';
import { Router, Routes } from '@angular/router';
import { IMicroFrontendConfig } from '../mfe/mfe.model';
import { loadRemoteModule } from '@angular-architects/module-federation';

@Injectable({
  providedIn: 'root',
})
export class BootstrapService {
  appInitialized: ((value: void | PromiseLike<void>) => void) | undefined;
  appConfigLoaded = false;

  constructor(private store: Store<AppState>, private router: Router) {}

  /**
   * init
   * @param envConfig
   * @returns
   */
  init(envConfig: { [key in string]: unknown }): Promise<void> {
    return new Promise((resolve) => {
      this.appInitialized = resolve;
      this.appConfigLoaded = false;

      // check authentication status -> callback mfe application config
      const callback = AppConfig.init({ envConfig });
      this.store.dispatch(Auth.init({ envConfig, callback }));
      this.listenConfigUpdates();
    });
  }

  private listenConfigUpdates(): void {
    this.store
      .select('appConfig')
      .pipe(takeWhile(() => !this.appConfigLoaded))
      .subscribe((config) => {
        if (!config.loaded) return;
        if (config.error) {
          this.configErrorHandler(config.error);
          return;
        }

        this.appConfigLoaded = true;
        this.loadApplicationConfig(config as AppConfig.State)
          .then(this.appInitialized)
          .catch(this.configErrorHandler.bind(this));
      });
  }

  private loadApplicationConfig(appConfig: AppConfig.State): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.router.resetConfig([
          ...this.buildRoutes(
            appConfig.coreApplications as IMicroFrontendConfig[]
          ),
          ...this.router.config,
        ]);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  private buildRoutes(options: IMicroFrontendConfig[]): Routes {
    const routes: Routes = options.map((d) => ({
      path: d.routePath,
      loadChildren: () => loadRemoteModule(d).then((m) => m[d.ngModuleName]),
    }));
    return routes;
  }

  private configErrorHandler(error: string): void {
    this.router.navigate(['error'], {
      queryParams: {
        message: error,
        prev: this.router.url,
      },
    });
    this.appInitialized?.();
  }

  private authErrorHandler(error: string): void {
    // Todo
  }
}
