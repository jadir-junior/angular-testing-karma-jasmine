import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { FlickrService } from './flickr.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IPhoto } from '../models/photo.model';
import { TestBed } from '@angular/core/testing';
import { photos } from '../spec-helpers/photo.spec-helper';

const searchTerm = 'dragonfly';
const expectedUrl = `https://www.flickr.com/services/rest/?tags=${searchTerm}&method=flickr.photos.search&format=json&nojsoncallback=1&tag_mode=all&media=photos&per_page=15&extras=tags,date_taken,owner_name,url_q,url_m&api_key=c3050d39a5bb308d9921bef0e15c437d`;

describe('FlickrService', () => {
  let service: FlickrService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FlickrService],
    });
    service = TestBed.inject(FlickrService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('searches for public photos', () => {
    let actualPhotos: IPhoto[] | undefined;
    service.searchPublicPhotos(searchTerm).subscribe((otherPhotos) => {
      actualPhotos = otherPhotos;
    });

    const request = controller.expectOne(expectedUrl);
    // Answer the request so the Observable emits a value
    request.flush({ photos: { photo: photos } });
    controller.verify();

    // Now verify emitted valued.
    expect(actualPhotos).toEqual(photos);
  });

  it('passes through search errors', () => {
    const status = 500;
    const statusText = 'Server error';
    const errorEvent = new ErrorEvent('API ERROR');

    let actualError: HttpErrorResponse | undefined;

    service.searchPublicPhotos(searchTerm).subscribe({
      next: () => {
        fail('next handler must not be called');
      },
      error: (error) => {
        actualError = error;
      },
      complete: () => {
        fail('complete handler must not be called');
      },
    });

    controller.expectOne(expectedUrl).flush(errorEvent, { status, statusText });

    if (!actualError) {
      throw new Error('Error needs to be defined');
    }

    expect(actualError.error).toBe(errorEvent);
    expect(actualError.status).toBe(status);
    expect(actualError.statusText).toBe(statusText);
  });
});
