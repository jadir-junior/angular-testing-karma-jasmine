import { Component, Input } from '@angular/core';

import { IPhoto } from 'src/app/models/photo.model';

@Component({
  selector: 'app-full-photo',
  templateUrl: './full-photo.component.html',
})
export class FullPhotoComponent {
  @Input()
  public photo: IPhoto | null = null;
}
