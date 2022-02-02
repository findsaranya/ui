import { createReducer, on, Action } from '@ngrx/store';

import * as ConfigActions from './config.actions';
import { ConfigEntity } from './config.models';

export const CONFIG_FEATURE_KEY = 'appConfig';

export interface State extends ConfigEntity {
  loaded: boolean;
  error?: string | null;
}

export interface ConfigPartialState {
  readonly [CONFIG_FEATURE_KEY]: State;
}

export const initialState: State = {
  loaded: false,
  coreApplications: null,
  navigation: null,
};

const configReducer = createReducer(
  initialState,
  on(ConfigActions.initApplicationConfig, (state: State) => ({
    ...state,
    loaded: false,
    error: null,
    coreApplications: null,
    navigation: null,
  })),
  on(ConfigActions.initApplicationConfigWithAuth, (state: State) => ({
    ...state,
    loaded: false,
    error: null,
    coreApplications: null,
    navigation: null,
  })),
  on(
    ConfigActions.loadConfigSuccess,
    (state, { appConfig, navigationConfig }) => ({
      ...state,
      error: null,
      loaded: true,
      coreApplications: appConfig,
      navigation: navigationConfig,
    })
  ),
  on(ConfigActions.loadConfigFailure, (state, { error }) => ({
    ...state,
    loaded: true,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return configReducer(state, action);
}
