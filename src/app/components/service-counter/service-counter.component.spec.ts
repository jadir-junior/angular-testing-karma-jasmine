import { BehaviorSubject, of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { click, expectText, setFieldValue } from 'src/app/utils/testing-helper';

import { CounterService } from 'src/app/services/counter.service';
import { ServiceCounterComponent } from './service-counter.component';

describe('ServiceCounterComponent', () => {
  xdescribe('ServiceCounterComponent: integration test', () => {
    let component: ServiceCounterComponent;
    let fixture: ComponentFixture<ServiceCounterComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ServiceCounterComponent],
        providers: [CounterService],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(ServiceCounterComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('shows the start count', () => {
      expectText(fixture, 'count', '0');
    });

    it('increments the count', () => {
      click(fixture, 'increment-button');
      fixture.detectChanges();
      expectText(fixture, 'count', '1');
    });

    it('decrement the count', () => {
      click(fixture, 'decrement-button');
      fixture.detectChanges();
      expectText(fixture, 'count', '-1');
    });

    it('resets the count', () => {
      const newCount = 456;
      setFieldValue(fixture, 'reset-input', String(newCount));
      click(fixture, 'reset-button');
      fixture.detectChanges();
      expectText(fixture, 'count', String(newCount));
    });
  });

  describe('ServiceCounterComponent: unit test', () => {
    const currentCount = 123;

    let component: ServiceCounterComponent;
    let fixture: ComponentFixture<ServiceCounterComponent>;
    let fakeCounterService: CounterService;

    beforeEach(async () => {
      // Create a fake
      fakeCounterService = jasmine.createSpyObj<CounterService>(
        'CounterService',
        {
          getCount: of(currentCount),
          increment: undefined,
          decrement: undefined,
          reset: undefined,
        }
      );

      await TestBed.configureTestingModule({
        declarations: [ServiceCounterComponent],
        // Use fake instead of original
        providers: [{ provide: CounterService, useValue: fakeCounterService }],
      }).compileComponents();

      fixture = TestBed.createComponent(ServiceCounterComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('shows the count', () => {
      expectText(fixture, 'count', String(currentCount));
      expect(fakeCounterService.getCount).toHaveBeenCalled();
    });

    it('increments the count', () => {
      click(fixture, 'increment-button');
      expect(fakeCounterService.increment).toHaveBeenCalled();
    });

    it('decrements the count', () => {
      click(fixture, 'decrement-button');
      expect(fakeCounterService.decrement).toHaveBeenCalled();
    });

    it('resets the count', () => {
      const newCount = 456;
      setFieldValue(fixture, 'reset-input', String(newCount));
      click(fixture, 'reset-button');
      expect(fakeCounterService.reset).toHaveBeenCalledWith(newCount);
    });
  });
});
