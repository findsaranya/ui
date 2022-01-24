import { TestBed } from '@angular/core/testing';

import { WildcardAuthGuard } from './wildcard-auth.guard';
import { provideMockStore } from '@ngrx/store/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { initialState, loggedIn } from '../+state/auth';

describe('WildcardAuthGuard', () => {
  let guard: WildcardAuthGuard;

  const mockRouter = { navigate: jest.fn(() => null) };

  describe('With login', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          provideMockStore({
            initialState: { ...initialState, loggedIn: true },
            selectors: [{ selector: loggedIn, value: true }],
          }),
          { provide: Router, useValue: mockRouter },
        ],
      });
      guard = TestBed.inject(WildcardAuthGuard);
    });

    it('should be created ', () => {
      expect(guard).toBeTruthy();
    });

    it('should return true [canActivate]', (done) => {
      guard
        .canActivate(new ActivatedRouteSnapshot(), {
          url: '/test',
          root: new ActivatedRouteSnapshot(),
        })
        .subscribe((d) => {
          expect(d).toBeTruthy();
          done();
        });
    });
  });

  describe('Without login', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          provideMockStore({
            initialState: { ...initialState, loggedIn: true },
            selectors: [{ selector: loggedIn, value: false }],
          }),
          { provide: Router, useValue: mockRouter },
        ],
      });
      guard = TestBed.inject(WildcardAuthGuard);
    });

    it('should return false [canActivate]', (done) => {
      guard
        .canActivate(new ActivatedRouteSnapshot(), {
          url: '/test',
          root: new ActivatedRouteSnapshot(),
        })
        .subscribe((d) => {
          expect(d).toBeFalsy();
          done();
        });
    });
  });
});
