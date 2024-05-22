/// <reference types="cypress" />

describe('Navegação', () => {
  beforeEach(() => {
      cy.visit('http://localhost:3000/trens')
  })

  

  it('Teste Linha', () => {
    cy.get('#modelo').select("Modelo 2")
    cy.get('#modelo').select("Modelo 3")
    cy.get('#codigoID').type('blahblahblah')
    cy.get('#linha').select("Linha 2")
    cy.get('#status').select("Ativo")
    cy.get('#enviar').click()
    //cy.get('.form-control').within(() => {
    //  cy.get('input:first').should('have.attr', 'placeholder', 'Email')
    //  cy.get('input:last').should('have.attr', 'placeholder', 'Password')
    //})
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