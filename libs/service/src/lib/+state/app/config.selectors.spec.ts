import { errorMessage } from './config.data';
import {
  ConfigPartialState,
  CONFIG_FEATURE_KEY,
  initialState,
} from './config.reducer';
import * as ConfigSelectors from './config.selectors';

describe('Config Selectors', () => {
  let state: ConfigPartialState;

  beforeEach(() => {
    state = {
      [CONFIG_FEATURE_KEY]: initialState,
    };
  });

  describe('Config Selectors', () => {
    it('getConfigLoaded() should return the current "loaded" status', () => {
      const result = ConfigSelectors.getConfigLoaded(state);
      expect(result).toBeFalsy();
    });

    it('getConfigError() should return the current "error" state', () => {
      state[CONFIG_FEATURE_KEY].error = errorMessage;
      const result = ConfigSelectors.getConfigError(state);
      expect(result).toBe(errorMessage);
    });
  });
});
