const BASE_URL = 'https://automationexercise.com'

describe('starting some tests', () => {
  it ('acess home page of automation exercise', () => {
    cy.visit(BASE_URL)
    cy.contains('Automation')
    cy.get('h1').contains('Automation')

    cy.get('.features_items')
  })

  it('Testing invalid login', () => {
    cy.visit(BASE_URL)
    cy.get('div.shop-menu').contains('Login').click()
    
    cy.contains('Login to your account')

    cy.get('[data-qa="login-email"]').type('invalid@email.com')
    cy.get('[data-qa="login-password"]').type('invalidpassword')

    cy.get('[data-qa="login-button"]').contains('Login').click()

    cy.contains('Your email or password is incorrect!')
  })

  it('products items', () => {
    cy.visit(BASE_URL)
    cy.get('.features_items')
    cy.get('.features_items').children().first()
    cy.get('.features_items').children().last()
    cy.get('.features_items').children().eq(4)

    cy.get('[data-product-id="2"]')
  })

  it.only('Set an item in cart and keep buying', () => {
    cy.visit(BASE_URL)
    cy.get('.features_items').children().eq(2).contains('Add to cart').click()
    cy.get('#cartModal').contains('Continue Shopping').click()
  })
})