import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { HttpClient } from '@angular/common/http';
import * as ConfigActions from './config.actions';

import { map } from 'rxjs';
import { IApplicationConfigResponce } from '.';

@Injectable()
export class ConfigEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigActions.init),
      fetch({
        run: (action) => {
          const env = action.envConfig;
          const URL = env['API_BASE_URL'] + 'api/mfe/config';

          return this.http.get<IApplicationConfigResponce>(URL).pipe(
            map((config: IApplicationConfigResponce) => {
              return ConfigActions.loadConfigSuccess({
                config: config.appConfig,
              });
            })
          );
        },
        onError: () => {
          const error = 'Failed to load application config';
          return ConfigActions.loadConfigFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions, private http: HttpClient) {}
}
