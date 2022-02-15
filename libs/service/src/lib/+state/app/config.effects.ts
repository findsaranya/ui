import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as ConfigActions from './config.actions';

import { catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { IApplicationConfigResponce, INavigationResponse } from '.';
import { ConfigService } from './config.service';

@Injectable()
export class ConfigEffects {
  initApplicationConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigActions.initApplicationConfig),
      switchMap(() => {
        return this.configService.applicationConfig().pipe(
          map((config: IApplicationConfigResponce) => {
            return ConfigActions.loadConfigSuccess({
              appConfig: config.data,
              navigationConfig: null,
            });
          }),
          catchError((e) => {
            const error =
              e.error?.['message'] || 'Failed to load application config';
            return of(ConfigActions.loadConfigFailure({ error }));
          })
        );
      })
    )
  );
  initApplicationConfigWithAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigActions.initApplicationConfigWithAuth),
      switchMap(() => {
        const request = [
          this.configService.applicationConfigWithAuth(),
          this.configService.getNavigationData(),
        ];
        return forkJoin(request).pipe(
          map((configResponse) => {
            const [applicationConfig, navigationConfig] = configResponse as [
              IApplicationConfigResponce,
              INavigationResponse
            ];
            return ConfigActions.loadConfigSuccess({
              appConfig: applicationConfig.data,
              navigationConfig: navigationConfig.data,
            });
          }),
          catchError(() => of(ConfigActions.initApplicationConfig()))
        );
      })
    )
  );

  handleNavigationPinToggle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ConfigActions.navigationPinToggle),
        switchMap((action) =>
          this.configService.updateNavigationPinState(action.collapsed)
        )
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private configService: ConfigService
  ) {}
}
