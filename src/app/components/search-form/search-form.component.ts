import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
})
export class SearchFormComponent {
  @Output()
  public search = new EventEmitter<string>();

  public handleSearch(event: Event, searchTerm: string): void {
    event.preventDefault();
    this.search.emit(searchTerm);
  }
}
