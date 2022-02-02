import { CounterService } from './counter.service';
import { first } from 'rxjs';

describe('CounterService', () => {
  let service: CounterService;

  function expectCount(count: number): void {
    let actualCount: number | undefined;
    service
      .getCount()
      .pipe(first())
      .subscribe((actualCount2) => {
        actualCount = actualCount2;
      });
    expect(actualCount).toBe(count);
  }

  beforeEach(() => {
    service = new CounterService();
  });

  it('returns the count', () => {
    expectCount(0);
  });

  it('increments the count', () => {
    service.increment();

    expectCount(1);
  });

  it('decrements the count', () => {
    service.decrement();

    expectCount(-1);
  });

  it('resets the count', () => {
    const newCount = 123;
    service.reset(newCount);

    expectCount(123);
  });
});
