import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnChanges {
  @Input() startCount = 0;

  @Output() countChange = new EventEmitter<number>();

  public count = 0;

  ngOnChanges(): void {
    this.count = this.startCount;
  }

  increment() {
    this.count++;
    this.notify();
  }

  decrement() {
    this.count--;
    this.notify();
  }

  reset(newCount: string) {
    const count = parseInt(newCount);
    if (!Number.isNaN(count)) {
      this.count = count;
      this.notify();
    }
  }

  private notify() {
    this.countChange.emit(this.count);
  }
}
