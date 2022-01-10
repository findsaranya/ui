import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs';

import * as AuthActions from './auth.actions';
import { AuthService } from './auth.service';

@Injectable()
export class AuthEffects {
  // check previous session
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.initSession),
      switchMap((action) => {
        const jwt = localStorage.getItem('_session');
        if (!jwt) {
          const actions: Action[] = [AuthActions.loadSessionFailed()];
          if (action.callback?.failure?.length)
            actions.push(...(action.callback.failure as Action[]));
          return actions;
        } else {
          const actions: Action[] = [
            AuthActions.loadSessionSuccess({ token: jwt }),
          ];
          if (action.callback?.success?.length)
            actions.push(...action.callback.success);
          return actions;
        }
      })
    )
  );

  // load user config / validate the user session is active
  initUserConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.initUserConfig),
      switchMap((action) => {
        console.log(action);
        return this.authService.getUserConfig(action.API_BASE_URL).pipe(
          map((data) => {
            return AuthActions.userConfigLoadSuccess({ data });
          }),
          catchError((e) => [AuthActions.userConfigLoadFailed({ error: e })])
        );
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private authService: AuthService
  ) {}
}
