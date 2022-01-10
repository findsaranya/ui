import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { switchMap } from 'rxjs';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.init),
      switchMap((action) => {
        return [
          AuthActions.loadAuthSuccess({ auth: [] }),
          action?.callback as Action,
        ];
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
