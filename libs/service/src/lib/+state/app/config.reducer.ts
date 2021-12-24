import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ConfigActions from './config.actions';
import { ConfigEntity } from './config.models';

export const CONFIG_FEATURE_KEY = 'config';

export interface State extends ConfigEntity {
  loaded: boolean;
  error?: string | null;
}

export interface ConfigPartialState {
  readonly [CONFIG_FEATURE_KEY]: State;
}

export const configAdapter: EntityAdapter<ConfigEntity> =
  createEntityAdapter<ConfigEntity>();

export const initialState: State = configAdapter.getInitialState({
  loaded: false,
  coreApplications: null,
});

const configReducer = createReducer(
  initialState,
  on(ConfigActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
    coreApplications: null,
  })),
  on(ConfigActions.loadConfigSuccess, (state, { config }) => ({
    error: null,
    loaded: true,
    coreApplications: config,
  })),
  on(ConfigActions.loadConfigFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return configReducer(state, action);
}
