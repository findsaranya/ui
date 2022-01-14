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
  on(AuthActions.loadSessionSuccess, (state, { sessionToken, isRefresh }) => ({
    ...state,
    token: sessionToken,
    authenticating: isRefresh ? state.authenticating : true,
    loaded: true,
  })),
  on(AuthActions.loadSessionFailed, (state, { error }) => ({
    ...state,
    loaded: true,
    authenticating: false,
    loggedIn: false,
    token: null,
    error,
  })),
  on(AuthActions.loginStart, (state) => ({
    ...state,
    authenticating: true,
    error: null,
  })),
  on(AuthActions.resetSession, (state) => ({
    ...state,
    loaded: true,
    authenticating: false,
    loggedIn: false,
    token: null,
    userConfig: null,
  })),

  on(AuthActions.userConfigLoadSuccess, (state, { data }) => ({
    ...state,
    authenticating: false,
    loggedIn: true,
    userConfig: data,
  })),
  on(AuthActions.userConfigLoadFailed, (state, { error }) => ({
    ...state,
    authenticating: false,
    loggedIn: false,
    userConfig: null,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
