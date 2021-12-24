import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
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

export const authAdapter: EntityAdapter<AuthEntity> =
  createEntityAdapter<AuthEntity>();

export const initialState: State = authAdapter.getInitialState({
  loaded: false,
  token: null,
});

const authReducer = createReducer(
  initialState,
  on(AuthActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(AuthActions.loadAuthSuccess, (state, { auth }) => ({
    ...state,
    loaded: true,
  })),
  on(AuthActions.loadAuthFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
