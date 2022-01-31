import { BehaviorSubject, Observable, of } from 'rxjs';
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

  describe('ServiceCounterComponent: unit test with minimal Service logic', () => {
    const newCount = 456;

    let component: ServiceCounterComponent;
    let fixture: ComponentFixture<ServiceCounterComponent>;

    let fakeCount$: BehaviorSubject<number>;
    let fakeCounterService: Pick<CounterService, keyof CounterService>;

    beforeEach(async () => {
      fakeCount$ = new BehaviorSubject(0);

      fakeCounterService = {
        getCount(): Observable<number> {
          return fakeCount$;
        },
        increment(): void {
          fakeCount$.next(1);
        },
        decrement(): void {
          fakeCount$.next(-1);
        },
        reset(): void {
          fakeCount$.next(Number(newCount));
        },
      };

      spyOn(fakeCounterService, 'getCount').and.callThrough();
      spyOn(fakeCounterService, 'increment').and.callThrough();
      spyOn(fakeCounterService, 'decrement').and.callThrough();
      spyOn(fakeCounterService, 'reset').and.callThrough();

      await TestBed.configureTestingModule({
        declarations: [ServiceCounterComponent],
        // Use fake instead of original
        providers: [{ provide: CounterService, useValue: fakeCounterService }],
      }).compileComponents();

      fixture = TestBed.createComponent(ServiceCounterComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('shows the start count', () => {
      expectText(fixture, 'count', '0');
      expect(fakeCounterService.getCount).toHaveBeenCalled();
    });

    it('increments the count', () => {
      click(fixture, 'increment-button');
      fakeCount$.next(1);
      fixture.detectChanges();

      expectText(fixture, 'count', '1');
      expect(fakeCounterService.increment).toHaveBeenCalled();
    });

    it('decrements the count', () => {
      click(fixture, 'decrement-button');
      fakeCount$.next(-1);
      fixture.detectChanges();

      expectText(fixture, 'count', '-1');
      expect(fakeCounterService.decrement).toHaveBeenCalled();
    });

    it('resets the count', () => {
      setFieldValue(fixture, 'reset-input', String(newCount));
      click(fixture, 'reset-button');
      fixture.detectChanges();

      expectText(fixture, 'count', String(newCount));
      expect(fakeCounterService.reset).toHaveBeenCalledWith(newCount);
    });
  });
});
