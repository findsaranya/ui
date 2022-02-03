import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FEATURE_KEY, State } from './auth.reducer';

// Lookup the 'Auth' feature state managed by NgRx
export const getAuthState = createFeatureSelector<State>(AUTH_FEATURE_KEY);

export const getAuthLoaded = createSelector(
  getAuthState,
  (state: State) => state.loaded
);
export const getSession = createSelector(
  getAuthState,
  (state: State) => state.token
);
export const loggedIn = createSelector(
  getAuthState,
  (state: State) => state.loggedIn
);

export const fullName = createSelector(
  getAuthState,
  (state: State) =>
    `${state.userConfig?.firstName} ${state.userConfig?.lastName}`
);

export const getAuthError = createSelector(
  getAuthState,
  (state: State) => state.error
);
