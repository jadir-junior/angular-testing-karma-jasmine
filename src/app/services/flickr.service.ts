import { Observable, map } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { IPhoto } from '../models/photo.model';
import { Injectable } from '@angular/core';

export interface FlickrAPIResponse {
  photos: {
    photo: IPhoto[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class FlickrService {
  constructor(private http: HttpClient) {}

  public searchPublicPhotos(searchTerm: string): Observable<IPhoto[]> {
    return this.http
      .get<FlickrAPIResponse>('https://www.flickr.com/services/rest/', {
        params: {
          tags: searchTerm,
          method: 'flickr.photos.search',
          format: 'json',
          nojsoncallback: '1',
          tag_mode: 'all',
          media: 'photos',
          per_page: '15',
          extras: 'tags,date_taken,owner_name,url_q,url_m',
          api_key: 'c3050d39a5bb308d9921bef0e15c437d',
        },
      })
      .pipe(map((response) => response.photos.photo));
  }
}
