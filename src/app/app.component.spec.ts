import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { CounterComponent } from './components/counter/counter.component';
import { MockComponent } from 'ng-mocks';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { findComponent } from './utils/testing-helper';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let counter: CounterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, MockComponent(CounterComponent)],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const counterEl = fixture.debugElement.query(
      By.directive(CounterComponent)
    );
    counter = counterEl.componentInstance;
  });

  it('renders without errors', () => {
    expect(component).toBeTruthy();
  });

  it('renders an independent counter', () => {
    expect(counter).toBeTruthy();
  });

  it('passes a start count', () => {
    expect(counter.startCount).toBe(5);
  });

  it('listens for count changes', () => {
    spyOn(console, 'log');

    // Act
    const count = 5;
    counter.countChange.emit(5);

    // Assert
    expect(console.log).toHaveBeenCalledWith(
      'countChange event from CounterComponent',
      count
    );
  });

  it('renders a service counter', () => {
    const serviceCounter = findComponent(fixture, 'app-service-counter');
    expect(serviceCounter).toBeTruthy();
  });

  it('renders a NgRx counter', () => {
    const ngrxCounter = findComponent(fixture, 'app-ngrx-counter');
    expect(ngrxCounter).toBeTruthy();
  });
});
