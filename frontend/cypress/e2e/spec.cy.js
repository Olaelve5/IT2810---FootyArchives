describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit('http://localhost:5173/project2')

    cy.contains('Brazil').click()

    cy.url().should('include', '/project2/nation/Brazil')
  })
})