import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedToLoadApplicationComponent } from './failed-to-load-application.component';

describe('FailedToLoadApplicationComponent', () => {
  let component: FailedToLoadApplicationComponent;
  let fixture: ComponentFixture<FailedToLoadApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FailedToLoadApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FailedToLoadApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
