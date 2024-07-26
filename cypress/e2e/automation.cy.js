describe('starting some tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('acess home page of automation exercise', () => {
    cy.contains('Automation')
    cy.get('h1').contains('Automation')

    cy.get('.features_items')
  })

  it('Testing invalid login', () => {
    cy.get('div.shop-menu').contains('Login').should('have.attr', 'href', '/login').click()
    
    cy.contains('Login to your account').should('be.visible')

    cy.get('[data-qa="login-email"]')
      .type('invalid@email.com')
      .should('have.value', 'invalid@email.com')
      .and('be.visible')
      .and('have.attr', 'placeholder', 'Email Address')
      .and('have.prop', 'required')

    cy.get('[data-qa="login-password"]')
      .type('invalidpassword')
      .should('not.have.value', '')
      .and('have.attr', 'placeholder', 'Password')
      .and('have.prop', 'required')

    cy.get('[data-qa="login-button"]').as('btnLogin').should(($button) => { // can be then instead of should // '$' because its DOM element
      expect($button).to.have.text('Login')
      expect($button).to.contain('Login')
      expect($button).to.be.visible
      expect($button).to.have.attr('type', 'submit')
      expect($button).to.have.class('btn')

      // cy.wrap($button).click() // if it has then() and not should() above, use this to click on an element 
    })
    cy.get('@btnLogin').click() // get alias as()

    cy.contains('Your email or password is incorrect!')
  })

  it('products items', () => {
    cy.get('.features_items')
    cy.get('.features_items').children().first()
    cy.get('.features_items').children().last()
    cy.get('.features_items').children().eq(4)

    cy.get('[data-product-id="2"]')
  })

  it('Set an item in cart and keep buying', () => {
    cy.get('.features_items').children().eq(2).contains('Add to cart').click()
    cy.get('#cartModal').contains('Continue Shopping').click()
  })

  it('Acessing product page using intercept', () => { // only hear endpoint
    cy.intercept('GET', 'products').as('getProducts')

    cy.get('.navbar-nav').contains('Products').then(($btn) => {
      cy.wrap($btn).click()
    })

    cy.wait('@getProducts').its('response.statusCode').should('eq', 200)
  })

  it('GET products using request', () => { // do request by itself
    cy.request('GET', 'api/productsList').should((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).not.to.be.empty
      
      const bodyResponse = JSON.parse(response.body)
      expect(bodyResponse).to.have.property('products')
      expect(bodyResponse.products).to.be.an('array')
      expect(bodyResponse.products).to.have.length.above(1)
    })
  })
})