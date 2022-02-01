import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IPhoto } from 'src/app/models/photo.model';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss'],
})
export class PhotoListComponent {
  @Input()
  public title = '';

  @Input()
  public photos: IPhoto[] = [];

  @Output()
  public focusPhoto = new EventEmitter<IPhoto>();

  public handleFocusPhoto(photo: IPhoto): void {
    this.focusPhoto.emit(photo);
  }
}
