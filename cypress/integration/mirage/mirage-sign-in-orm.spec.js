import { makeServer } from "../../../src/mirageServer"

context('Sign In Page - mirage ORM', () => {
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
    const user = server.create('user', { username: 'peter' } )
    window.localStorage.setItem('token', user.token)
    cy.visit('/sign-in');
    cy.url().should('include', '/dashboard')
    cy.contains('peter')
  })

  it('User with invalid token should not be redirect to dashboard', () => {
    localStorage.setItem('token', '12345')
    cy.visit('/sign-in');
    
    cy.url().should('include', '/sign-in')
    cy.contains('Sign In')
  })

  it('If login failed, should show error message', () => {
    cy.visit('/sign-in');

    cy.get('#username').type('abc')
    cy.get('#password').type('abc')
    cy.get('button[type=submit]').click()

    cy.contains('Login fail')
  })

  it('If login success, should redirect to dashboard', () => {
    server.create('user', { username: 'abc' } )
    cy.visit('/sign-in');    

    cy.get('#username').type('abc')
    cy.get('#password').type('abc')
    cy.get('button[type=submit]').click()

    cy.url().should('include', '/dashboard')
  })
})
