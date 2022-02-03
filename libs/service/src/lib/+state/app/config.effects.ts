import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as ConfigActions from './config.actions';

import { catchError, map, of, switchMap } from 'rxjs';
import { IApplicationConfigResponce } from '.';
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
              config: config.data,
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
        return this.configService.applicationConfigWithAuth().pipe(
          map((config: IApplicationConfigResponce) => {
            return ConfigActions.loadConfigSuccess({
              config: config.data,
            });
          }),
          catchError(() => of(ConfigActions.initApplicationConfig()))
        );
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private configService: ConfigService
  ) {}
}
