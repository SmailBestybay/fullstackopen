const user = {
  name: 'Smile',
  username: 'smileDEV',
  password: 'secret',
}

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()
      cy.contains(`${user.name} logged in`)
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('invalid username')
      cy.get('#password').type('invalid password')
      cy.get('#login-button').click()
      cy.get('.error').should('contain', 'wrong credentials')
      cy.and('have.css', 'color', 'rgb(255, 0, 0)')
      cy.and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function(){
      cy.login(user)
      cy.addBlog()
    })

    it('A blog can be created', function() {
      const newBlog = {
        title: 'Signals are back!',
        author: 'Devfluencer ',
        url: 'bab@dev.to'
      }
      cy.contains('new blog').click()
      cy.get('#title').type(newBlog.title)
      cy.get('#author').type(newBlog.author)
      cy.get('#url').type(newBlog.url)
      cy.get('#create-button').click()
      cy.contains(newBlog.title + ' ' + newBlog.author)
    })

    it('A blog can be liked', function(){
      cy.contains('view').click()
      cy.contains('likes 0')
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('A blog can be deleted', function() {
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('html').should('not.contain', 'view')
    })
  })
})