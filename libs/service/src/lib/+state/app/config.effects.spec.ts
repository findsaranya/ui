import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';

import * as ConfigActions from './config.actions';
import { ConfigEffects } from './config.effects';

import { apps, errorMessage } from './config.data';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ConfigService, IApplicationConfigResponce } from '.';

describe('ConfigEffects', () => {
  let actions: Observable<Action>;
  let effects: ConfigEffects;

  const responce: IApplicationConfigResponce = {
    data: apps,
  };
  const mockConfigService = {
    applicationConfig: jest.fn(() => of(responce)),
    applicationConfigWithAuth: jest.fn(() => of(responce)),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot(), HttpClientTestingModule],
      providers: [
        ConfigEffects,
        { provide: ConfigService, useValue: mockConfigService },
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });
    effects = TestBed.inject(ConfigEffects);
  });

  describe('Config Effect [Without Auth]', () => {
    it('should init the application config', () => {
      actions = hot('-a-|', {
        a: ConfigActions.initApplicationConfig(),
      });

      const expected = hot('-a-|', {
        a: ConfigActions.loadConfigSuccess({ config: apps }),
      });

      expect(effects.initApplicationConfig$).toBeObservable(expected);
    });

    it('Should throw error to init config', () => {
      actions = hot('-a-|', {
        a: ConfigActions.initApplicationConfig(),
      });

      mockConfigService.applicationConfig = jest.fn(() =>
        throwError(() => errorMessage)
      );

      const expected = hot('-a-|', {
        a: ConfigActions.loadConfigFailure({ error: errorMessage }),
      });

      expect(effects.initApplicationConfig$).toBeObservable(expected);
    });
    it('Should throw error to init config with http response', () => {
      actions = hot('-a-|', {
        a: ConfigActions.initApplicationConfig(),
      });

      mockConfigService.applicationConfig = jest.fn(() =>
        throwError(() => ({
          error: {
            message: errorMessage,
          },
        }))
      );

      const expected = hot('-a-|', {
        a: ConfigActions.loadConfigFailure({ error: errorMessage }),
      });

      expect(effects.initApplicationConfig$).toBeObservable(expected);
    });
  });
  describe('Config Effect [With Auth]', () => {
    it('should init the application config', () => {
      actions = hot('-a-|', {
        a: ConfigActions.initApplicationConfigWithAuth(),
      });

      const expected = hot('-a-|', {
        a: ConfigActions.loadConfigSuccess({ config: apps }),
      });

      expect(effects.initApplicationConfigWithAuth$).toBeObservable(expected);
    });

    it('Should throw error to init config and return init config without auth observable', () => {
      actions = hot('-a-|', {
        a: ConfigActions.initApplicationConfigWithAuth(),
      });

      mockConfigService.applicationConfigWithAuth = jest.fn(() =>
        throwError(() => errorMessage)
      );

      const expected = hot('-a-|', {
        a: ConfigActions.initApplicationConfig(),
      });

      expect(effects.initApplicationConfigWithAuth$).toBeObservable(expected);
    });
  });
});
