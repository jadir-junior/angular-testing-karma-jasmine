describe('Flickr search', () => {
  const SEARCH_TERM = 'flower';

  beforeEach(() => {
    cy.visit('/flickr');
  });

  it('searches for a term', () => {
    cy.byTestId('search-term-input').first().clear().type(SEARCH_TERM);
    cy.byTestId('submit-search').first().click();

    cy.byTestId('photo-item-link')
      .should('have.length', 15)
      .each((link) => {
        expect(link.attr('href')).to.contain('https://www.flickr.com/photos/');
      });

    cy.byTestId('photo-item-image').should('have.length', 15);
  });

  it.only('shows the full photo', () => {
    cy.byTestId('search-term-input').first().clear().type(SEARCH_TERM);
    cy.byTestId('submit-search').first().click();
    cy.byTestId('photo-item-link').first().click();

    cy.byTestId('full-photo').should('contain', SEARCH_TERM);
    cy.byTestId('full-photo-title').should('not.have.text', '');
    cy.byTestId('full-photo-tags').should('not.have.text', '');
    cy.byTestId('full-photo-image').should('exist');
  });
});
