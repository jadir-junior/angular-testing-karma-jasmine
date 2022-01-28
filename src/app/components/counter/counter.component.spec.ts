import { ComponentFixture, TestBed } from '@angular/core/testing';
import { click, expectText, setFieldValue } from 'src/app/utils/testing-helper';
import { take, toArray } from 'rxjs';

import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let fixture: ComponentFixture<CounterComponent>;
  let component: CounterComponent;

  const startCount = 123;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    component.startCount = startCount;
    component.ngOnChanges();
    fixture.detectChanges();
  });

  it('increments the count', () => {
    // Act: Click on the increment button
    click(fixture, 'increment-button');
    fixture.detectChanges();

    // Assert: Expect that the displayed count now reads "1"
    expectText(fixture, 'count', String(startCount + 1));
  });

  it('decrements the count', () => {
    // Act
    click(fixture, 'decrement-button');
    fixture.detectChanges();

    // Arrange
    expectText(fixture, 'count', String(startCount - 1));
  });

  it('resets the count', () => {
    const newCount = '123';

    // Act
    setFieldValue(fixture, 'reset-input', newCount);
    click(fixture, 'reset-button');
    fixture.detectChanges();

    // Assert
    expectText(fixture, 'count', newCount);
  });

  it('does not reset if the value is not a number', () => {
    const value = 'not a number';

    // Act
    setFieldValue(fixture, 'reset-input', value);
    click(fixture, 'reset-button');
    fixture.detectChanges();

    // Assert
    expectText(fixture, 'count', String(startCount));
  });

  it('shows the start count', () => {
    expectText(fixture, 'count', String(startCount));
  });

  it('emits countChange events on increment', () => {
    // Arrange
    let actualCount: number | undefined;
    component.countChange.subscribe((count: number) => {
      actualCount = count;
    });

    // Act
    click(fixture, 'increment-button');

    // Assert
    expect(actualCount).toBe(startCount + 1);
  });

  it('emits countChange events on decrement', () => {
    // Arrange
    let actualCount: number | undefined;
    component.countChange.subscribe((count: number) => {
      actualCount = count;
    });

    // Act
    click(fixture, 'decrement-button');

    // Assert
    expect(actualCount).toBe(startCount - 1);
  });

  it('emits countChange events on reset', () => {
    const newCount = 123;

    // Arrange
    let actualCount: number | undefined;
    component.countChange.subscribe((count: number) => {
      actualCount = count;
    });

    // Act
    setFieldValue(fixture, 'reset-input', String(newCount));
    click(fixture, 'reset-button');

    // Assert
    expect(actualCount).toBe(newCount);
  });

  it('emits countChange events', () => {
    // Arrange
    const newCount = 123;

    // Capture all emitted values in an array
    let actualCounts: number[] | undefined;

    // Transform the Observable, then subscribe
    component.countChange
      .pipe(
        // Close the Observable after three values
        take(3),
        // Collect all values in an array
        toArray()
      )
      .subscribe((counts) => {
        actualCounts = counts;
      });

    // Act
    click(fixture, 'increment-button');
    click(fixture, 'decrement-button');
    setFieldValue(fixture, 'reset-input', String(newCount));
    click(fixture, 'reset-button');

    // Assert
    expect(actualCounts).toEqual([startCount + 1, startCount, newCount]);
  });
});
