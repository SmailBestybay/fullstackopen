describe('Bloglist app', function() {
  it('front page can be opened', function () {
    cy.visit('http://localhost:3000')
    cy.contains('log in to application')
  })
})