import { Component } from '@angular/core';
import { FlickrService } from 'src/app/services/flickr.service';
import { IPhoto } from 'src/app/models/photo.model';

@Component({
  selector: 'app-flickr-search',
  templateUrl: './flickr-search.component.html',
  styleUrls: ['./flickr-search.component.scss'],
})
export class FlickrSearchComponent {
  public searchTerm = '';
  public photos: IPhoto[] = [];
  public currentPhoto: IPhoto | null = null;

  constructor(private flickrService: FlickrService) {}

  public handleSearch(searchTerm: string): void {
    this.flickrService.searchPublicPhotos(searchTerm).subscribe((photos) => {
      this.searchTerm = searchTerm;
      this.photos = photos;
      this.currentPhoto = null;
    });
  }

  public handleFocusPhoto(photo: IPhoto): void {
    this.currentPhoto = photo;
  }
}
