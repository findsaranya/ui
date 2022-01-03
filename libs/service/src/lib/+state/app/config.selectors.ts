import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CONFIG_FEATURE_KEY, State } from './config.reducer';

// Lookup the 'Config' feature state managed by NgRx
export const getConfigState = createFeatureSelector<State>(CONFIG_FEATURE_KEY);

export const getConfigLoaded = createSelector(
  getConfigState,
  (state: State) => state.loaded
);

export const getConfigError = createSelector(
  getConfigState,
  (state: State) => state.error
);
