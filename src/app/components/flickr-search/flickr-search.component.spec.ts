import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlickrSearchComponent } from './flickr-search.component';

describe('FlickrSearchComponent', () => {
  let component: FlickrSearchComponent;
  let fixture: ComponentFixture<FlickrSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlickrSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlickrSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
