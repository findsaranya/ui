import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, map, of, switchMap } from 'rxjs';
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

        //success
        if (action.callback?.success?.length)
          this.#loginSuccessCallback = [...action.callback.success];
        this.#loginSuccessCallback?.push(AuthActions.initUserConfig());

        // failure
        if (action.callback?.failure?.length)
          this.#loginFailedCallBack = [
            ...(action.callback.failure as Action[]),
          ];

        // logout
        if (action.callback?.logout?.length)
          this.#logoutCallback = [...(action.callback.logout as Action[])];
        this.#logoutCallback?.push(AuthActions.resetSession());

        if (!jwt) {
          return of(
            AuthActions.loadSessionFailed({
              error: null,
            })
          );
        } else {
          return of(
            AuthActions.loadSessionSuccess({
              sessionToken: jwt,
              isRefresh: false,
            })
          );
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
          catchError((e) => of(AuthActions.userConfigLoadFailed({ error: e })))
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
            return AuthActions.loadSessionSuccess({
              sessionToken,
              isRefresh: false,
            });
          }),
          catchError((e) => {
            const error = e.error.message || 'Failed to login';
            return of(AuthActions.loadSessionFailed({ error }));
          })
        );
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() => {
        return this.authService.logout().pipe(
          map(() => {
            localStorage.removeItem('_session');
            return AuthActions.logoutSuccess();
          }),
          catchError(() => {
            localStorage.removeItem('_session');
            window.location.reload();
            return of(AuthActions.logoutFailed());
          })
        );
      })
    )
  );

  $loadSessionSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadSessionSuccess),
      switchMap((action) => {
        if (action.isRefresh && !this.loginSuccessCallback) return of();
        return of(...this.loginSuccessCallback);
      })
    )
  );

  $loadSessionFailed = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadSessionFailed),
      switchMap(() => {
        if (!this.loginFailedCallback) return of();
        return of(...this.loginFailedCallback);
      })
    )
  );

  $logoutSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutSuccess),
      switchMap(() => {
        if (!this.logoutCallback) return of();
        return of(...this.logoutCallback);
      })
    )
  );

  $refreshSession = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshSession),
      switchMap((action) => {
        localStorage.removeItem('_session');
        localStorage.setItem('_session', action?.sessionToken);
        return of(
          AuthActions.loadSessionSuccess({
            sessionToken: action.sessionToken,
            isRefresh: true,
          })
        );
      })
    )
  );

  #loginSuccessCallback: Action[] = [];
  get loginSuccessCallback() {
    return this.#loginSuccessCallback;
  }

  #loginFailedCallBack: Action[] = [];
  get loginFailedCallback() {
    return this.#loginFailedCallBack;
  }

  #logoutCallback: Action[] = [];
  get logoutCallback() {
    return this.#logoutCallback;
  }
  constructor(
    private readonly actions$: Actions,
    private authService: AuthService
  ) {}
}
