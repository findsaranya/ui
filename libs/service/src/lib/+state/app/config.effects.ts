import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as ConfigActions from './config.actions';
import * as ConfigFeature from './config.reducer';

@Injectable()
export class ConfigEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return ConfigActions.loadConfigSuccess({ config: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return ConfigActions.loadConfigFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
