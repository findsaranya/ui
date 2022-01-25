import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';

import { BootstrapService } from './bootstrap.service';

describe('BootstrapService', () => {
  let service: BootstrapService;

  const mockRouter = {};

  const mockActivatedRoute = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BootstrapService,
        provideMockStore(),
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    });
    service = TestBed.inject(BootstrapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call init method', () => {
    service.init();
    expect(service.appInitialized).not.toBeUndefined();
  });
});
