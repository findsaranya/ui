import { Action } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { UserConfig } from './auth.data';
import { State, initialState, reducer } from './auth.reducer';

describe('Auth Reducer', () => {
  const createAuthEntity = (auth: State): State => auth;

  describe('valid Auth actions', () => {
    it('init session and reset values', () => {
      const action = AuthActions.initSession({});
      const result: State = reducer(initialState, action);
      expect(result.loaded).toBeFalsy();
      expect(result.token).toBeNull();
      expect(result.loggedIn).toBeNull();
      expect(result.userConfig).toBeNull();
      expect(result.authenticating).toBeFalsy();
    });
    it('should return load session success values [Non refresh]', () => {
      const action = AuthActions.loadSessionSuccess({
        sessionToken: 'JWT',
        isRefresh: false,
      });

      const result: State = reducer(initialState, action);
      expect(result.loaded).toBeTruthy();
      expect(result.token).toEqual('JWT');
      expect(result.loggedIn).toBeNull();
      expect(result.userConfig).toBeNull();
      expect(result.authenticating).toBeTruthy();
    });
    it('should return load session success values [With refresh]', () => {
      const action = AuthActions.loadSessionSuccess({
        sessionToken: 'JWT',
        isRefresh: true,
      });

      const result: State = reducer(initialState, action);
      expect(result.loaded).toBeTruthy();
      expect(result.token).toEqual('JWT');
      expect(result.loggedIn).toBeNull();
      expect(result.userConfig).toBeNull();
      expect(result.authenticating).toBeFalsy();
    });
    it('should return load session failed', () => {
      const error = 'Unable to load the application';
      const action = AuthActions.loadSessionFailed({
        error,
      });

      const result: State = reducer(initialState, action);
      expect(result.loaded).toBeTruthy();
      expect(result.authenticating).toBeFalsy();
      expect(result.loggedIn).toBeFalsy();
      expect(result.token).toBeNull();
      expect(result.error).toEqual(error);
      expect(result.userConfig).toBeNull();
    });
    it('should return login start state', () => {
      const action = AuthActions.loginStart({
        email: 'admin',
        password: 'admin',
      });

      const result: State = reducer(initialState, action);
      expect(result.loaded).toBeFalsy();
      expect(result.loggedIn).toBeFalsy();
      expect(result.token).toBeNull();
      expect(result.authenticating).toBeTruthy();
      expect(result.error).toBeNull();
      expect(result.userConfig).toBeNull();
    });
    it('should return reset session state', () => {
      const action = AuthActions.resetSession();

      const result: State = reducer(initialState, action);
      expect(result.loaded).toBeTruthy();
      expect(result.authenticating).toBeFalsy();
      expect(result.loggedIn).toBeFalsy();
      expect(result.token).toBeNull();
      expect(result.error).toBeUndefined();
      expect(result.userConfig).toBeNull();
    });
    it('should return user config load success state', () => {
      const state = createAuthEntity({
        authenticating: true,
        loggedIn: false,
        token: 'JWT',
        userConfig: null,
        loaded: true,
      });
      const action = AuthActions.userConfigLoadSuccess({ data: UserConfig });

      const result: State = reducer(state, action);
      expect(result.authenticating).toBeFalsy();
      expect(result.loggedIn).toBeTruthy();
      expect(result.userConfig).toEqual(UserConfig);
      expect(result.loaded).toBeTruthy();
      expect(result.error).toBeUndefined();
    });
    it('should return user config load failed state', () => {
      const error = 'User config load Failed';
      const state = createAuthEntity({
        authenticating: true,
        loggedIn: false,
        token: 'JWT',
        userConfig: null,
        loaded: true,
      });
      const action = AuthActions.userConfigLoadFailed({ error });

      const result: State = reducer(state, action);
      expect(result.authenticating).toBeFalsy();
      expect(result.loggedIn).toBeFalsy();
      expect(result.userConfig).toBeNull();
      expect(result.loaded).toBeTruthy();
      expect(result.error).toEqual(error);
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
