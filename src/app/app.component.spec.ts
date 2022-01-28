import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { findComponent } from './utils/testing-helper';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders without errors', () => {
    expect(component).toBeTruthy();
  });

  it('renders an independent counter', () => {
    const counter = findComponent(fixture, 'app-counter');
    expect(counter).toBeTruthy();
  });

  it('passes a start count', () => {
    const counter = findComponent(fixture, 'app-counter');
    expect(counter.properties['startCount']).toBe(5);
  });

  it('listens for count changes', () => {
    // Arrange
    spyOn(console, 'log');

    // Act
    const counter = findComponent(fixture, 'app-counter');
    const count = 5;
    counter.triggerEventHandler('countChange', count);

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
