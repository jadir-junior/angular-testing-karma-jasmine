import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { photo1, photos } from 'src/app/spec-helpers/photo.spec-helper';

import { FlickrSearchComponent } from './flickr-search.component';
import { FlickrService } from 'src/app/services/flickr.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { findComponent } from 'src/app/utils/testing-helper';
import { of } from 'rxjs';

describe('FlickrSearchComponent', () => {
  let component: FlickrSearchComponent;
  let fixture: ComponentFixture<FlickrSearchComponent>;
  let fakeFlickrService: Pick<FlickrService, keyof FlickrService>;

  let searchForm: DebugElement;
  let photoList: DebugElement;

  beforeEach(async () => {
    fakeFlickrService = {
      searchPublicPhotos: jasmine
        .createSpy('searchPublicPhotos')
        .and.returnValue(of(photos)),
    };

    await TestBed.configureTestingModule({
      declarations: [FlickrSearchComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: FlickrService, useValue: fakeFlickrService }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlickrSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    searchForm = findComponent(fixture, 'app-search-form');
    photoList = findComponent(fixture, 'app-photo-list');
  });

  it('renders the search form and the photo list, not the full photo', () => {
    expect(searchForm).toBeTruthy();
    expect(photoList).toBeTruthy();
    expect(photoList.properties['title']).toBe('');
    expect(photoList.properties['photos']).toEqual([]);

    expect(() => {
      findComponent(fixture, 'app-full-ṕhoto');
    }).toThrow();
  });

  it('searches and passes the resulting photos to the photo list', () => {
    const searchTerm = 'beatuiful flowers';
    searchForm.triggerEventHandler('search', searchTerm);
    fixture.detectChanges();

    expect(fakeFlickrService.searchPublicPhotos).toHaveBeenCalledWith(
      searchTerm
    );
    expect(photoList.properties['title']).toBe(searchTerm);
    expect(photoList.properties['photos']).toEqual(photos);
  });

  it('renders the full photo when a photo is focussed', () => {
    expect(() => {
      findComponent(fixture, 'app-full-photo');
    }).toThrow();

    photoList.triggerEventHandler('focusPhoto', photo1);

    fixture.detectChanges();

    const fullPhoto = findComponent(fixture, 'app-full-photo');
    expect(fullPhoto.properties['photo']).toBe(photo1);
  });
});
