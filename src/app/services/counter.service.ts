import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';

interface ICounter {
  getCount(): Observable<number>;
  increment(): void;
  decrement(): void;
  reset(newCount: number): void;
}

@Injectable({
  providedIn: 'root',
})
export class CounterService implements ICounter {
  private count = 0;

  private subject: BehaviorSubject<number>;

  constructor() {
    this.subject = new BehaviorSubject(this.count);
  }

  public getCount(): Observable<number> {
    return this.subject.asObservable();
  }

  public increment(): void {
    this.count++;
    this.notify();
  }

  public decrement(): void {
    this.count--;
    this.notify();
  }

  public reset(newCount: number): void {
    this.count = newCount;
    this.notify();
  }

  private notify(): void {
    this.subject.next(this.count);
  }
}
