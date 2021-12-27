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

import { IApplicationConfigResponce } from '.';
import { HttpClient } from '@angular/common/http';

describe('ConfigEffects', () => {
  let actions: Observable<Action>;
  let effects: ConfigEffects;

  const mockHttpClient = {
    get: jest.fn((url: string) => {
      if (url !== 'api/mfe/config') return throwError(() => errorMessage);
      const responce: IApplicationConfigResponce = {
        appConfig: apps,
      };
      return of(responce);
    }),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot(), HttpClientTestingModule],
      providers: [
        ConfigEffects,
        { provide: HttpClient, useValue: mockHttpClient },
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });
    effects = TestBed.inject(ConfigEffects);
  });

  describe('init$', () => {
    it('should init the config', () => {
      actions = hot('-a-|', {
        a: ConfigActions.init({ envConfig: { API_BASE_URL: '' } }),
      });

      const expected = hot('-a-|', {
        a: ConfigActions.loadConfigSuccess({ config: apps }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
    it('Should throw error to init config', () => {
      actions = hot('-a-|', {
        a: ConfigActions.init({ envConfig: { API_BASE_URL: 'ERROR' } }),
      });

      const expected = hot('-(a|)', {
        a: ConfigActions.loadConfigFailure({ error: errorMessage }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
