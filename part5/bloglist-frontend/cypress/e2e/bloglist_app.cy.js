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
      const newBlog = {
        title: 'Will the AI take over with 0 likes?',
        author: 'Doomfluencer',
        url: 'prop@poo.com'
      }
      cy.addBlog(newBlog)
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
      cy.get('.like-count').as('likeCount').contains('likes 0')
      cy.get('.like').click()
      cy.get('@likeCount').contains('likes 1')
    })

    it('A blog can be deleted', function() {
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('html').should('not.contain', 'view')
    })

    it('only the creator can see the delete button of a blog', function () {
      const userWithoutBlogs = {
        name: 'noBlogPerson',
        username: 'bloglessDEV',
        password: 'ewwwblogs',
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users/`, userWithoutBlogs)
      cy.login(userWithoutBlogs)
      cy.contains('view').click()
      cy.get('.blog').should('not.contain', 'remove')
    })

    it('the blogs are ordered according to likes in descending order', function() {
      const blogOneLike = {
        title: 'One like blog',
        author: 'Doomfluencer',
        url: 'prop@poo.com'
      }
      const blogTwoLikes = {
        title: 'Two like blog',
        author: 'Doomfluencer',
        url: 'prop@poo.com'
      }
      cy.addBlog(blogOneLike)
      cy.addBlog(blogTwoLikes)

      cy.get('.blog')
        .contains(blogOneLike.title)
        .contains('view')
        .click()
        .get('.like')
        .click()

      cy.get('.blog')
        .contains(blogTwoLikes.title)
        .contains('view')
        .click()
        .get('.like')
        .click({ multiple: true })
        .click({ multiple: true })

      cy.get('.blog').eq(0).should('contain', blogTwoLikes.title)
      cy.get('.blog').eq(1).should('contain', blogOneLike.title)
      cy.get('.blog').eq(2).contains('view').click().get('.like-count').contains('0')
    })
  })
})