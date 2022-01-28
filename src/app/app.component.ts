import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  handleCountChange(count: number): void {
    console.log('countChange event from CounterComponent', count);
  }
}
