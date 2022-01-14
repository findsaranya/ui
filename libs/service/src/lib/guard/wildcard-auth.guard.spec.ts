import { TestBed } from '@angular/core/testing';

import { WildcardAuthGuard } from './wildcard-auth.guard';

describe('WildcardAuthGuard', () => {
  let guard: WildcardAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WildcardAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
