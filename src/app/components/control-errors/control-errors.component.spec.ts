import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlErrorsComponent } from './control-errors.component';

describe('ControlErrorsComponent', () => {
  let component: ControlErrorsComponent;
  let fixture: ComponentFixture<ControlErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlErrorsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
