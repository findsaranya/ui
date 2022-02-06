import { AUTH_FEATURE_KEY } from '.';
import { UserConfig } from './auth.data';
import { AuthPartialState, initialState } from './auth.reducer';
import * as AuthSelectors from './auth.selectors';

describe('Auth Selectors', () => {
  let state: AuthPartialState;

  describe('Auth Selectors', () => {
    beforeEach(() => {
      state = {
        [AUTH_FEATURE_KEY]: { ...initialState },
      };
    });
    it('getAuthState() should return the list of Auth', () => {
      const results = AuthSelectors.getAuthState(state);
      expect(results.loaded).toBeFalsy();
      expect(results.token).toBeNull();
      expect(results.loggedIn).toBeNull();
      expect(results.userConfig).toBeNull();
      expect(results.authenticating).toBeFalsy();
    });
    it('getAuthLoaded() should return Falsy', () => {
      const result = AuthSelectors.getAuthLoaded(state);
      expect(result).toBeFalsy();
    });
    it('getSession() should return null', () => {
      const result = AuthSelectors.getSession(state);
      expect(result).toBeNull();
    });
    it('loggedIn() should return null', () => {
      const result = AuthSelectors.loggedIn(state);
      expect(result).toBeNull();
    });
    it('fullName() should return null', () => {
      const result = AuthSelectors.fullName(state);
      expect(result).toEqual('undefined undefined');
    });
    it('getAuthError() should return undefined', () => {
      const result = AuthSelectors.getAuthError(state);
      expect(result).toBeUndefined();
    });
  });

  describe('Auth selector with user config', () => {
    beforeEach(() => {
      state = {
        [AUTH_FEATURE_KEY]: { ...initialState, userConfig: UserConfig },
      };
    });
    it('fullName() with user config should return fullName', () => {
      state[AUTH_FEATURE_KEY].userConfig = UserConfig;
      const result = AuthSelectors.fullName(state);
      expect(result).toEqual('fn ln');
    });
  });
});
