import { Component } from '@angular/core';

@Component({
  selector: 'app-page-counter',
  template:
    '<app-counter [startCount]="5" (countChange)="handleCountChange($event)"></app-counter>',
})
export class PageCounterComponent {
  handleCountChange(count: number): void {
    console.log('countChange event from CounterComponent', count);
  }
}
