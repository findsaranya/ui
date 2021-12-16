import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as ConfigActions from './config.actions';
import { ConfigEffects } from './config.effects';

describe('ConfigEffects', () => {
  let actions: Observable<Action>;
  let effects: ConfigEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ConfigEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ConfigEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ConfigActions.init() });

      const expected = hot('-a-|', {
        a: ConfigActions.loadConfigSuccess({ config: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
