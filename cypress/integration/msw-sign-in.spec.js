import { API_ENDPOINT } from "../../src/WebAPI";

context('Sign In Page - msw', () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
    localStorage.removeItem('token');
  })

  it('Logged-in user should be redirect to dashboard', () => {
    localStorage.setItem('token', '12345')
    cy.visit('/sign-in');
    
    cy.window().then((window) => {
      const { worker, rest } = window.msw
      worker.use(
        rest.get(`${API_ENDPOINT}/me`, (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              ok: true,
              data: {
                username: "my username",
              },
            })
          );
        })
      )

      cy.url().should('include', '/dashboard')
      cy.contains('my username')
    })
  })

  it('User with invalid token should not be redirect to dashboard', () => {
    localStorage.setItem('token', '12345')
    cy.visit('/sign-in');
    
    cy.window().then((window) => {
      const { worker, rest } = window.msw
      worker.use(
        rest.get(`${API_ENDPOINT}/me`, (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              ok: false,
            })
          );
        })
      )

      cy.url().should('include', '/sign-in')
      cy.contains('Sign In')
    })
  })

  it('If login failed, should show error message', () => {
    cy.visit('/sign-in');    
    cy.window().then((window) => {
      const { worker, rest } = window.msw
      worker.use(
        rest.post(`${API_ENDPOINT}/login`, (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              ok: false,
            })
          );
        })
      )

      cy.get('#username').type('abc')
      cy.get('#password').type('abc')
      cy.get('button[type=submit]').click()

      cy.contains('Login fail')
    })
  })

  it('If login success, should redirect to dashboard', () => {
    cy.visit('/sign-in');    
    cy.window().then((window) => {
      const { worker, rest } = window.msw
      worker.use(
        rest.post(`${API_ENDPOINT}/login`, (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              ok: true,
              token: '12345'
            })
          );
        })
      )

      cy.get('#username').type('abc')
      cy.get('#password').type('abc')
      cy.get('button[type=submit]').click()

      cy.url().should('include', '/dashboard')
    })
  })

})
