import { Action } from '@ngrx/store';
import { IMicroFrontendConfig } from './config.models';

import * as ConfigActions from './config.actions';
import { ConfigEntity } from './config.models';
import { State, initialState, reducer } from './config.reducer';

import { appsWithAuth, sideNavSampleData } from './config.data';
import { INavigation } from '.';

describe('Config Reducer', () => {
  const createConfigEntity = (
    coreApplications: IMicroFrontendConfig[] | null,
    navigation: INavigation | null
  ): ConfigEntity => ({
    coreApplications,
    navigation,
  });

  describe('valid Config actions', () => {
    it('init config should reset the config [Without Auth]', () => {
      const action = ConfigActions.initApplicationConfig();
      const result: State = reducer(initialState, action);
      expect(result.loaded).toBeFalsy();
      expect(result.coreApplications).toBeNull();
      expect(result.navigation).toBeNull();
      expect(result.error).toBeNull();
    });
    it('init config should reset the config [With Auth]', () => {
      const action = ConfigActions.initApplicationConfigWithAuth();
      const result: State = reducer(initialState, action);
      expect(result.loaded).toBeFalsy();
      expect(result.coreApplications).toBeNull();
      expect(result.error).toBeNull();
    });

    it('loadConfigSuccess should return the list of known Config', () => {
      const config = createConfigEntity(
        appsWithAuth as IMicroFrontendConfig[],
        sideNavSampleData as INavigation
      );
      const action = ConfigActions.loadConfigSuccess({
        appConfig: config.coreApplications as IMicroFrontendConfig[],
        navigationConfig: config.navigation as INavigation,
      });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBeTruthy();
      expect(result.coreApplications?.length).toBe(3);
      expect(result.navigation).not.toBeNull();
      expect(result.error).toBeNull();
    });

    it('should toggle the navigation collapse', () => {
      const action = ConfigActions.navigationPinToggle({ collapsed: false });
      const result = reducer(
        { ...initialState, navigation: sideNavSampleData },
        action
      );
      expect(result.loaded).toBeFalsy();
      expect(result.coreApplications).toBeNull();
      expect(result.navigation?.collapsed).toBeFalsy();
      expect(result.error).toBeUndefined();
    });
    it('loadConfigError should return the error message', () => {
      const errorMessage = 'Failed to load application config';
      const action = ConfigActions.loadConfigFailure({ error: errorMessage });
      const result = reducer(initialState, action);
      expect(result.loaded).toBeTruthy();
      expect(result.coreApplications).toBeNull();
      expect(result.navigation).toBeNull();
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
