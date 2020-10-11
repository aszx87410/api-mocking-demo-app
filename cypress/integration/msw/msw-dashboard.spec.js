import { API_ENDPOINT } from "../../../src/WebAPI";

context('Sign In Page - msw', () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
    localStorage.removeItem('token');
  })

  it('Logged-in user should be able to see dashboard', () => {
    localStorage.setItem('token', '12345')
    cy.visit('/dashboard');
    
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

      cy.contains('my username')
    })
  })

  it('User with invalid token should be redirect to sign in page', () => {
    localStorage.setItem('token', '12345')
    cy.visit('/dashboard');
    
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
    })
  })
})
