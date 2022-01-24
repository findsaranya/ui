import {
  HttpErrorResponse,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of, throwError } from 'rxjs';
import { AuthService, getSession, initialState } from '../+state/auth';

import { TokenInterceptor } from './token.interceptor';

describe('TokenInterceptor', () => {
  const mockAuthService = {
    refreshToken: jest.fn(() => {
      return of(new HttpResponse({ body: { accessToken: 'JWT' } }));
    }),
  };
  const mockErrorHandler = {
    handle: jest.fn(() =>
      throwError(
        () =>
          new HttpErrorResponse({
            status: 401,
            error: { message: 'Unauthorized' },
          })
      )
    ),
  };

  const mockHttpSuccess = {
    handle: jest.fn(() => of(new HttpResponse())),
  };
  let interceptor: TokenInterceptor;

  describe('With token state', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          TokenInterceptor,
          provideMockStore({
            initialState: initialState,
            selectors: [
              {
                selector: getSession,
                value: 'JWT',
              },
            ],
          }),
          { provide: AuthService, useValue: mockAuthService },
        ],
      });
      interceptor = TestBed.inject(TokenInterceptor);
    });

    it('should be created', () => {
      expect(interceptor).toBeTruthy();
    });

    it('Should validate intercept method [Direct request]', (done) => {
      interceptor
        .intercept(
          new HttpRequest('GET', 'http://localhost/health'),
          mockHttpSuccess
        )
        .subscribe((d) => {
          expect((d as HttpResponse<unknown>).status).toEqual(200);
          done();
        });
    });
    it('Should validate intercept method [login request]', (done) => {
      interceptor
        .intercept(
          new HttpRequest('GET', 'http://localhost/login'),
          mockHttpSuccess
        )
        .subscribe((d) => {
          expect((d as HttpResponse<unknown>).status).toEqual(200);
          done();
        });
    });
    it('Should validate intercept method [Refresh token request]', (done) => {
      interceptor
        .intercept(
          new HttpRequest('GET', 'http://localhost/refreshtoken'),
          mockHttpSuccess
        )
        .subscribe((d) => {
          expect((d as HttpResponse<unknown>).status).toEqual(200);
          done();
        });
    });
    it('Should validate intercept method [Handler Auth Error] error as Object', (done) => {
      interceptor
        .intercept(
          new HttpRequest('GET', 'http://localhost/health'),
          mockErrorHandler
        )

        .subscribe({
          error: (error) => {
            expect(error).toEqual('Unauthorized');
            done();
          },
        });
    });
    it('Should validate intercept method [Handler Auth Error] string error', (done) => {
      interceptor
        .intercept(new HttpRequest('GET', 'http://localhost/health'), {
          handle: () =>
            throwError(
              () =>
                new HttpErrorResponse({
                  status: 401,
                  error: 'Unauthorized',
                })
            ),
        })
        .subscribe({
          error: (error) => {
            expect(error).toEqual('');
            done();
          },
        });
    });
    it('Should validate intercept method [Internal server error]', (done) => {
      interceptor
        .intercept(new HttpRequest('GET', 'http://localhost/health'), {
          handle: () =>
            throwError(
              () =>
                new HttpErrorResponse({
                  status: 500,
                  error: 'Internal server error',
                })
            ),
        })
        .subscribe({
          error: (error) => {
            expect(error.status).toEqual(500);
            done();
          },
        });
    });

    it('Should validate intercept method [Handler Auth Error while refreshing]', (done) => {
      interceptor.isTokenRefreshing = true;
      interceptor
        .intercept(
          new HttpRequest('GET', 'http://localhost/health'),
          mockErrorHandler
        )
        .subscribe({
          error: (error) => {
            expect(error.status).toEqual(401);
            done();
          },
        });
      interceptor.refreshTokenSubject.next(true);
    });
  });

  describe('Without Auth', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          TokenInterceptor,
          provideMockStore({
            initialState: initialState,
            selectors: [
              {
                selector: getSession,
                value: null,
              },
            ],
          }),
          { provide: AuthService, useValue: mockAuthService },
        ],
      });
      interceptor = TestBed.inject(TokenInterceptor);
    });

    it('Should validate intercept method [Direct request]', (done) => {
      interceptor
        .intercept(
          new HttpRequest('GET', 'http://localhost/health'),
          mockHttpSuccess
        )
        .subscribe((d) => {
          expect((d as HttpResponse<unknown>).status).toEqual(200);
          done();
        });
    });
  });
});
