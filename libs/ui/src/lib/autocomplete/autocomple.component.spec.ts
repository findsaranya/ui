import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleComponent } from './autocomple.component';

describe('AutocompleComponent', () => {
  let component: AutocompleComponent;
  let fixture: ComponentFixture<AutocompleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocompleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
