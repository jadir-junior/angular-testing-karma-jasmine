import {
  photo1,
  photo1Link,
  photos,
  searchTerm,
} from '../../src/app/spec-helpers/photo.spec-helper';

import { FlickrSearch } from 'cypress/pages/flickr-search.page';

const flickrResponse = {
  photos: {
    photo: photos,
  },
};

describe('Flickr with fake response', () => {
  let page: FlickrSearch;

  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: 'https://www.flickr.com/services/rest/*',
        query: {
          tags: searchTerm,
          method: 'flickr.photos.search',
          format: 'json',
          nojsoncallback: '1',
          tag_mode: 'all',
          media: 'photos',
          per_page: '15',
          extras: 'tags,date_taken,owner_name,url_q,url_m',
          api_key: '*',
        },
      },
      {
        body: flickrResponse,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    ).as('flickrSearchRequest');

    page = new FlickrSearch();
    page.visit();
  });

  it('seaches for a term', () => {
    page.searchFor(searchTerm);

    cy.wait('@flickrSearchRequest');

    page
      .photoItemLinks()
      .should('have.length', 2)
      .each((link, index) => {
        expect(link.attr('href')).to.equal(
          `https://www.flickr.com/photos/${photos[index].owner}/${photos[index].id}`
        );
      });

    page
      .photoItemImages()
      .should('have.length', 2)
      .each((image, index) => {
        expect(image.attr('src')).to.equal(photos[index].url_q);
      });
  });

  it('shows the full photo', () => {
    page.searchFor(searchTerm);

    cy.wait('@flickrSearchRequest');

    page.photoItemLinks().first().click();
    page.fullPhoto().should('contain', searchTerm);
    page.fullPhotoTitle().should('have.text', photo1.title);
    page.fullPhotoTags().should('have.text', photo1.tags);
    page.fullPhotoImage().should('have.attr', 'src', photo1.url_m);
    page.fullPhotoLink().should('have.attr', 'href', photo1Link);
  });
});
