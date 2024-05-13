/// <reference types="cypress" />

describe('Estações', () => {
  beforeEach(() => {
      cy.visit('http://localhost:3000/estacoes')
  })

  it('Teste Nome', () => {
    cy.get('#nome').type('blahblahblah')
    cy.get('#nome').should('have.value', 'blahblahblah')
    //cy.get('.form-control').within(() => {
    //  cy.get('input:first').should('have.attr', 'placeholder', 'Email')
    //  cy.get('input:last').should('have.attr', 'placeholder', 'Password')
    //})
  })

  it('Teste Linha', () => {
    cy.get('#LinhaPertence').select("Linha 2")
    cy.get('#LinhaPertence').select("Linha 3")
    cy.get('#LinhaPertence').select("Linha 4")
    //cy.get('.form-control').within(() => {
    //  cy.get('input:first').should('have.attr', 'placeholder', 'Email')
    //  cy.get('input:last').should('have.attr', 'placeholder', 'Password')
    //})
  })
  
  it('Teste Kilometragem', () => {
    cy.get('#km').select("KM 2")
    cy.get('#km').select("KM 3")
    cy.get('#km').select("KM 4")
  })

  it('Teste Submit', () => {
    cy.get('#enviar').should('contain','Enviar')
  })

  /* it('navegar para a página de vídeos', () => {
      cy.get('#search_form_input_homepage').type('gatos{enter}')
      cy.get('#zci-videos').click()
      cy.url().should('include', 'videos')
  })
  
  it('navegar para a página de notícias', () => {
      cy.get('#search_form_input_homepage').type('gatos{enter}')
      cy.get('#zci-news').click()
      cy.url().should('include', 'news')
  })
  } */
})