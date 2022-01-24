import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, createAction } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { Observable, of, throwError } from 'rxjs';

import * as AuthActions from './auth.actions';
import { AuthEffects } from './auth.effects';
import { cold, hot } from 'jasmine-marbles';
import { AuthService, constructPassword, ILoginPayload } from '.';
import { UserConfig } from './auth.data';
import {
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';

describe('AuthEffects', () => {
  let actions: Observable<Action>;
  let effects: AuthEffects;

  const mockAuthService = {
    getUserConfig: jest.fn(() => of(UserConfig)),
    login: jest.fn((payload: ILoginPayload): unknown => {
      const validPassword = new constructPassword('admin').password;
      if (payload.username === 'admin' && payload.password === validPassword) {
        const resp = new HttpResponse({
          headers: new HttpHeaders({ ['X-token']: 'JWT' }),
        });
        return of(resp);
      } else {
        return throwError(
          () =>
            new HttpErrorResponse({ error: { message: 'Invalid credentials' } })
        );
      }
    }),
    logout: jest.fn(() => of(new HttpResponse())),
  };

  describe('actions without callbacks', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NxModule.forRoot()],
        providers: [
          AuthEffects,
          { provide: AuthService, useValue: mockAuthService },
          provideMockActions(() => actions),
          provideMockStore(),
        ],
      });

      effects = TestBed.inject(AuthEffects);
    });
    describe('init$', () => {
      it('should work without callback and return load session success', () => {
        actions = hot('-a-|', { a: AuthActions.initSession({}) });
        localStorage.setItem('_session', 'JWT');
        const expected = hot('-a-|', {
          a: AuthActions.loadSessionSuccess({
            sessionToken: 'JWT',
            isRefresh: false,
          }),
        });

        expect(effects.init$).toBeObservable(expected);
      });
      it('should work with callback and return load session success', () => {
        const action = createAction('Dummy action')();
        actions = hot('-a-|', {
          a: AuthActions.initSession({
            callback: {
              failure: [action],
              logout: [action],
              success: [action],
            },
          }),
        });
        localStorage.setItem('_session', 'JWT');
        const expected = hot('-a-|', {
          a: AuthActions.loadSessionSuccess({
            sessionToken: 'JWT',
            isRefresh: false,
          }),
        });

        expect(effects.init$).toBeObservable(expected);
      });

      it('should return error load session failed', () => {
        localStorage.setItem('_session', '');
        actions = hot('-a-|', { a: AuthActions.initSession({}) });

        const expected = hot('-a-|', {
          a: AuthActions.loadSessionFailed({
            error: null,
          }),
        });

        expect(effects.init$).toBeObservable(expected);
      });
    });

    describe('initUserConfig$', () => {
      it('should return user config load success', () => {
        actions = hot('-a-|', { a: AuthActions.initUserConfig() });

        const expected = hot('-a-|', {
          a: AuthActions.userConfigLoadSuccess({
            data: UserConfig,
          }),
        });

        expect(effects.initUserConfig$).toBeObservable(expected);
      });
      it('should return user config load failed', () => {
        actions = hot('-a-|', { a: AuthActions.initUserConfig() });

        const errorMessage = 'Failed to load the user config';

        mockAuthService.getUserConfig = jest.fn(() =>
          throwError(() => errorMessage)
        );
        const expected = hot('-a-|', {
          a: AuthActions.userConfigLoadFailed({
            error: errorMessage,
          }),
        });

        expect(effects.initUserConfig$).toBeObservable(expected);
      });
    });

    describe('loginStart$', () => {
      it('should return load session success', () => {
        actions = hot('-a-|', {
          a: AuthActions.loginStart({ email: 'admin', password: 'admin' }),
        });

        const expected = hot('-a-|', {
          a: AuthActions.loadSessionSuccess({
            isRefresh: false,
            sessionToken: 'JWT',
          }),
        });

        expect(effects.loginStart$).toBeObservable(expected);
        expect(localStorage.getItem('_session')).toEqual('JWT');
      });
      it('should return load session failed', () => {
        actions = hot('-a-|', {
          a: AuthActions.loginStart({
            email: 'admin',
            password: 'wrong password',
          }),
        });

        const expected = hot('-a-|', {
          a: AuthActions.loadSessionFailed({
            error: 'Invalid credentials',
          }),
        });

        expect(effects.loginStart$).toBeObservable(expected);
        expect(localStorage.getItem('_session')).toBeNull();
      });
      it('should return load session failed : custom response', () => {
        actions = hot('-a-|', {
          a: AuthActions.loginStart({
            email: 'admin',
            password: 'wrong password',
          }),
        });

        mockAuthService.login = jest.fn((loginPayload: ILoginPayload) =>
          throwError(
            () =>
              new HttpErrorResponse({
                error: 'Internal server error' + loginPayload.username,
              })
          )
        );
        const expected = hot('-a-|', {
          a: AuthActions.loadSessionFailed({
            error: 'Failed to login',
          }),
        });

        expect(effects.loginStart$).toBeObservable(expected);
        expect(localStorage.getItem('_session')).toBeNull();
      });
    });

    describe('logout$', () => {
      it('should return logout success', () => {
        localStorage.setItem('_session', 'JWT');
        actions = hot('-a-|', {
          a: AuthActions.logout(),
        });

        const expected = hot('-a-|', {
          a: AuthActions.logoutSuccess(),
        });

        expect(effects.logout$).toBeObservable(expected);
        expect(localStorage.getItem('_session')).toBeNull();
      });
      it('should return logout failed', () => {
        localStorage.setItem('_session', 'JWT');
        actions = hot('-a-|', {
          a: AuthActions.logout(),
        });

        const expected = hot('-a-|', {
          a: AuthActions.logoutFailed(),
        });

        mockAuthService.logout = jest.fn(() => throwError(() => ''));

        expect(effects.logout$).toBeObservable(expected);
        expect(localStorage.getItem('_session')).toBeNull();
      });
    });

    describe('refreshSession$', () => {
      it('should refresh the token', () => {
        localStorage.setItem('_session', 'JWT');
        actions = hot('-a-|', {
          a: AuthActions.refreshSession({ sessionToken: 'JWT_NEW' }),
        });
        const expected = hot('-a-|', {
          a: AuthActions.loadSessionSuccess({
            sessionToken: 'JWT_NEW',
            isRefresh: true,
          }),
        });

        expect(effects.refreshSession$).toBeObservable(expected);
        expect(localStorage.getItem('_session')).toEqual('JWT_NEW');
      });
    });
    describe('loadSessionSuccess$', () => {
      it('load login success callbacks ', () => {
        actions = hot('-a', {
          a: AuthActions.loadSessionSuccess({
            isRefresh: false,
            sessionToken: 'JWT',
          }),
        });

        const expected = cold('');

        expect(effects.loadSessionSuccess$).toBeObservable(expected);
      });
      it('load login failed callbacks ', () => {
        actions = hot('-a', {
          a: AuthActions.loadSessionFailed({
            error: null,
          }),
        });

        const expected = cold('');

        expect(effects.loadSessionFailed$).toBeObservable(expected);
      });
      it('load logout callbacks ', () => {
        actions = hot('-a', {
          a: AuthActions.logoutSuccess(),
        });

        const expected = cold('');

        expect(effects.logoutSuccess$).toBeObservable(expected);
      });
    });
  });
  describe('With callback action', () => {
    const action = createAction('Dummy action')();
    beforeAll(() => {
      TestBed.configureTestingModule({
        imports: [NxModule.forRoot()],
        providers: [
          AuthEffects,
          { provide: AuthService, useValue: mockAuthService },
          provideMockActions(() => actions),
          provideMockStore(),
        ],
      });

      effects = TestBed.inject(AuthEffects);
    });

    it('init', () => {
      localStorage.setItem('_session', 'JWT');
      actions = hot('-a-|', {
        a: AuthActions.initSession({
          callback: {
            failure: [action],
            logout: [action],
            success: [action],
          },
        }),
      });
      const expected = hot('-a-|', {
        a: AuthActions.loadSessionSuccess({
          sessionToken: 'JWT',
          isRefresh: false,
        }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
    it('load login success callbacks ', () => {
      actions = hot('-a', {
        a: AuthActions.loadSessionSuccess({
          isRefresh: false,
          sessionToken: 'JWT',
        }),
      });

      const expected = cold('-(bc)', {
        b: action,
        c: AuthActions.initUserConfig(),
      });

      expect(effects.loadSessionSuccess$).toBeObservable(expected);
    });
    it('load login failed callbacks ', () => {
      actions = hot('-a', {
        a: AuthActions.loadSessionFailed({
          error: null,
        }),
      });

      const expected = cold('-b', {
        b: action,
      });

      expect(effects.loadSessionFailed$).toBeObservable(expected);
    });
    it('load logout callbacks ', () => {
      actions = hot('-a', {
        a: AuthActions.logoutSuccess(),
      });

      const expected = cold('-(bc)', {
        b: action,
        c: AuthActions.resetSession(),
      });

      expect(effects.logoutSuccess$).toBeObservable(expected);
    });
  });
});
