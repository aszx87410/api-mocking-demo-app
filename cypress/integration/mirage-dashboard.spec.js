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

  it('Logged-in user should be able to see dashboard', () => {
    window.localStorage.setItem('token', '12345')
    server.get('/me', () => ({
      ok: true,
      data: {
        username: 'my username'
      }
    }))
    cy.visit('/dashboard');
    cy.contains('my username')
  })

  it('User with invalid token should be redirect to sign in page', () => {
    localStorage.setItem('token', '12345')
    
    server.get('/me', () => ({
      ok: false,
    }))

    cy.visit('/dashboard');
    
    cy.url().should('include', '/sign-in')
  })
})
