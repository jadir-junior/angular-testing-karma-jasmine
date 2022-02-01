import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IPhoto } from 'src/app/models/photo.model';

@Component({
  selector: 'app-photo-item',
  templateUrl: './photo-item.component.html',
  styleUrls: ['./photo-item.component.scss'],
})
export class PhotoItemComponent {
  @Input()
  public photo: IPhoto | null = null;

  @Output()
  public focusPhoto = new EventEmitter<IPhoto>();

  public handleClick(event: MouseEvent): void {
    event.preventDefault();
    if (this.photo) {
      this.focusPhoto.emit(this.photo);
    }
  }
}
