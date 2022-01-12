import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, act } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs';
import { LoginPayload } from '.';

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
      switchMap(() => {
        return this.authService.getUserConfig().pipe(
          map((data) => {
            return AuthActions.userConfigLoadSuccess({ data });
          }),
          catchError((e) => [AuthActions.userConfigLoadFailed({ error: e })])
        );
      })
    )
  );

  loginStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginStart),
      switchMap((action) => {
        const payload = new LoginPayload(action.email, action.password).parse();
        return this.authService.login(payload).pipe(
          map((loginResponse) => {
            const sessionToken = loginResponse.headers.get('X-token') || '';
            localStorage.setItem('_session', sessionToken);
            return AuthActions.loginSuccess({ sessionToken });
          }),
          catchError((e) => {
            // Todo
            const error = e;
            return [AuthActions.loginError({ error: 'Failed to login' })];
          })
        );
      })
    )
  );

  $loginSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      switchMap(() => [AuthActions.initUserConfig()])
    )
  );

  constructor(
    private readonly actions$: Actions,
    private authService: AuthService
  ) {}
}
