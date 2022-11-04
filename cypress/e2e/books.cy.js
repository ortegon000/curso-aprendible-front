describe('empty spec', () => {
  it('can list, show, create, edit and delete books', () => {
    // list books 
    cy.visit('/')
      .get('[data-cy=link-to-books]')
      .click()

    // create book
    cy.get('[href="/libros/crear"]')
      .click()
      .get('[data-cy=input-book-title]')
      .type('The Lord of the Rings')
      .get('[data-cy=button-submit-book]')
      .click()
      .get('[data-cy=book-list]')
      .contains('The Lord of the Rings')

    // show book
    cy.get('[data-cy^=link-to-visit-book-]')
      .last()
      .click()
      .get('h1')
      .should('contain.text', 'The Lord of the Rings')
      .get('[href="/libros"]')
      .click()

    // edit book
    cy.get('[data-cy^=link-to-edit-book-]')
      .last()
      .click()
      .get('[data-cy=input-book-title]')
      .clear()
      .type('The Hobbit')
      .get('[data-cy=button-update-book]')
      .click()
      .get('[data-cy=book-list]')
      .contains('The Hobbit')

    // delete book
    cy.get('[data-cy^=link-to-delete-book-]')
    .last()
    .click()
    .wait(2000)
    .get('[data-cy^=link-to-visit-book-]')
    .last()
    .should('not.contain.text', 'The Hobbit')
  })
})