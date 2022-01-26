import { Action } from '@ngrx/store';
import { IMicroFrontendConfig } from '../../mfe/mfe.model';

import * as ConfigActions from './config.actions';
import { ConfigEntity } from './config.models';
import { State, initialState, reducer } from './config.reducer';

import { appsWithAuth } from './config.data';

describe('Config Reducer', () => {
  const createConfigEntity = (
    coreApplications: IMicroFrontendConfig[] | null
  ): ConfigEntity => ({
    coreApplications,
  });

  describe('valid Config actions', () => {
    it('init config should reset the config [Without Auth]', () => {
      const action = ConfigActions.initApplicationConfig();
      const result: State = reducer(initialState, action);
      expect(result.loaded).toBe(false);
      expect(result.coreApplications).toBe(null);
      expect(result.error).toBe(null);
    });
    it('init config should reset the config [With Auth]', () => {
      const action = ConfigActions.initApplicationConfigWithAuth();
      const result: State = reducer(initialState, action);
      expect(result.loaded).toBe(false);
      expect(result.coreApplications).toBe(null);
      expect(result.error).toBe(null);
    });

    it('loadConfigSuccess should return the list of known Config', () => {
      const config = createConfigEntity(appsWithAuth as IMicroFrontendConfig[]);
      const action = ConfigActions.loadConfigSuccess({
        config: config.coreApplications as IMicroFrontendConfig[],
      });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.coreApplications?.length).toBe(2);
      expect(result.error).toBe(null);
    });

    it('loadConfigError should return the error message', () => {
      const errorMessage = 'Failed to load application config';
      const action = ConfigActions.loadConfigFailure({ error: errorMessage });
      const result = reducer(initialState, action);
      expect(result.loaded).toBeTruthy();
      expect(result.coreApplications).toBeNull();
      expect(result.error).toBe(errorMessage);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
