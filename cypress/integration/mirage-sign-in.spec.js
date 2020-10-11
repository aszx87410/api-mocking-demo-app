import { makeServer } from "../../src/mirageServer"

context('Sign In Page - mirage', () => {
  let server

  beforeEach(() => {
    cy.viewport(1024, 768);
    localStorage.removeItem('token');
    server = makeServer({ environment: "test" })
  })

  afterEach(() => {
    server.shutdown()
  })

  it('Logged-in user should be redirect to dashboard', () => {
    window.localStorage.setItem('token', '12345')
    server.get('/me', () => ({
      ok: true,
      data: {
        username: 'my username'
      }
    }))
    cy.visit('/sign-in');
    cy.url().should('include', '/dashboard')
    cy.contains('my username')
  })

  it('User with invalid token should not be redirect to dashboard', () => {
    localStorage.setItem('token', '12345')
    
    server.get('/me', () => ({
      ok: false,
    }))

    cy.visit('/sign-in');
    
    cy.url().should('include', '/sign-in')
    cy.contains('Sign In')
  })

  it('If login failed, should show error message', () => {
    server.post('/login', () => ({
      ok: false,
    }))

    cy.visit('/sign-in');

    cy.get('#username').type('abc')
    cy.get('#password').type('abc')
    cy.get('button[type=submit]').click()

    cy.contains('Login fail')
  })

  it('If login success, should redirect to dashboard', () => {
    server.post('/login', () => ({
      ok: true,
      token: '12345'
    }))
    cy.visit('/sign-in');    

    cy.get('#username').type('abc')
    cy.get('#password').type('abc')
    cy.get('button[type=submit]').click()

    cy.url().should('include', '/dashboard')
  })
})
