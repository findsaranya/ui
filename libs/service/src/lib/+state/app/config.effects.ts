import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as ConfigActions from './config.actions';

import { catchError, map, of, switchMap } from 'rxjs';
import { IApplicationConfigResponce } from '.';

@Injectable()
export class ConfigEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigActions.init),
      switchMap((action) => {
        const env = action.envConfig;
        const URL = env['API_BASE_URL'] + 'api/mfe/config';
        return this.http.get<IApplicationConfigResponce>(URL).pipe(
          map((config: IApplicationConfigResponce) => {
            return ConfigActions.loadConfigSuccess({
              config: config.appConfig,
            });
          })
        );
      }),
      catchError(() => {
        const error = 'Failed to load application config';
        return of(ConfigActions.loadConfigFailure({ error }));
      })
    )
  );

  constructor(private readonly actions$: Actions, private http: HttpClient) {}
}
