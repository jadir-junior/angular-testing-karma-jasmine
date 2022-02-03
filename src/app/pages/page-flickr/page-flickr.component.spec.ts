import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFlickrComponent } from './page-flickr.component';

describe('PageFlickrComponent', () => {
  let component: PageFlickrComponent;
  let fixture: ComponentFixture<PageFlickrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageFlickrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageFlickrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
