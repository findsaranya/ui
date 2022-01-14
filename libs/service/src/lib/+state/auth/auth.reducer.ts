import { createReducer, on, Action } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { AuthEntity } from './auth.models';

export const AUTH_FEATURE_KEY = 'auth';

export interface State extends AuthEntity {
  loaded: boolean; // has the Auth list been loaded
  error?: string | null; // last known error (if any)
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: State;
}

export const initialState: State = {
  loaded: false,
  token: null,
  loggedIn: null,
  userConfig: null,
  authenticating: false,
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.initSession, () => ({
    ...initialState,
  })),
  on(AuthActions.loadSessionSuccess, (state, { token }) => ({
    ...state,
    token,
    loaded: true,
  })),
  on(AuthActions.loadSessionFailed, (state) => ({
    ...state,
    loaded: true,
    loggedIn: false,
  })),
  on(AuthActions.loginStart, (state) => ({
    ...state,
    authenticating: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, { sessionToken }) => ({
    ...state,
    authenticating: true,
    error: null,
    token: sessionToken,
  })),
  on(AuthActions.loginError, (state, { error }) => ({
    ...state,
    authenticating: false,
    loggedIn: false,
    error,
  })),
  on(AuthActions.userConfigLoadSuccess, (state, { data }) => ({
    ...state,
    authenticating: false,
    loggedIn: true,
    userConfig: data,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
