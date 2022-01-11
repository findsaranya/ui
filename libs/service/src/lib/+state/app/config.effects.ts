import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as ConfigActions from './config.actions';

import { catchError, map, of, switchMap } from 'rxjs';
import { IApplicationConfigResponce } from '.';
import { ConfigService } from './config.service';

@Injectable()
export class ConfigEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigActions.init),
      switchMap(() => {
        return this.configService.applicationConfig().pipe(
          map((config: IApplicationConfigResponce) => {
            return ConfigActions.loadConfigSuccess({
              config: config.data,
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

  constructor(
    private readonly actions$: Actions,
    private configService: ConfigService
  ) {}
}
