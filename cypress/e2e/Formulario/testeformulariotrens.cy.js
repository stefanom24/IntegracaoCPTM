/// <reference types="cypress" />

describe('Navegação', () => {
  beforeEach(() => {
      cy.visit('http://localhost:3000/trens')
  })

  it('Teste Modelo', () => {
    cy.get('#modelo').select("Modelo 2")
    cy.get('#modelo').select("Modelo 3")
    cy.get('#modelo').select("Modelo 1")
    //cy.get('.form-control').within(() => {
    //  cy.get('input:first').should('have.attr', 'placeholder', 'Email')
    //  cy.get('input:last').should('have.attr', 'placeholder', 'Password')
    //})
  })

  it('Teste CodigoID', () => {
    cy.get('#codigoID').type('69420')
    cy.get('#codigoID').should('have.value', '69420')
  })
  
  it('Teste Linhas', () => {
    cy.get('#linha').select("Linha 2")
    cy.get('#linha').select("Linha 3")
  })

  it('Teste Status', () => {
    cy.get('#status').select("Inativo")
    cy.get('#status').select("Ativo")
  })

  it('Teste Class', () => {
    cy.get('#classificacao').select("1")
    cy.get('#classificacao').select("2")
    cy.get('#classificacao').select("3")
  })

  it('Teste Submit', () => {
    cy.get('#enviar').should('contain','Salvar')
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