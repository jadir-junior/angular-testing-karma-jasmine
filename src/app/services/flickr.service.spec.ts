import { FlickrService } from './flickr.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('FlickrService', () => {
  let service: FlickrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(FlickrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
