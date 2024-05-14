/// <reference types="cypress" />

describe('Estações', () => {
  beforeEach(() => {
      cy.visit('http://localhost:3000/linhas')
  })

  it('Teste Nome', () => {
    cy.get('#NomeLinha').type('69')
    cy.get('#NomeLinha').should('have.value', '69')
    //cy.get('.form-control').within(() => {
    //  cy.get('input:first').should('have.attr', 'placeholder', 'Email')
    //  cy.get('input:last').should('have.attr', 'placeholder', 'Password')
    //})
  })

  it('Teste Estaçao Numero', () => {
    cy.get('#Estacoes').type('8008135')
    cy.get('#Estacoes').should('have.value', '8008135')
  })

  it('Teste Extensao', () => {
    cy.get('#Extensao').type('3000000')
    cy.get('#Extensao').should('have.value', '3000000')
  })

  it('Teste Velocidade', () => {
    cy.get('#Velocidade').select("Nivel 2")
    cy.get('#Velocidade').select("Nivel 3")
    cy.get('#Velocidade').select("Nivel 1")
    cy.get('#Velocidade').select("Nivel 4")
  })

  it('Teste Carga', () => {
    cy.get('#Carga').select("Não")
    cy.get('#Carga').select("Sim")
  })

  it('Teste Hw', () => {
    cy.get('#HW').type('3000000')
    cy.get('#HW').should('have.value', '3000000')
  })

  it('Teste Viagens', () => {
    cy.get('#Viagens').type('3000000')
    cy.get('#Viagens').should('have.value', '3000000')
  })

  it('Teste Passageiros', () => {
    cy.get('#MediaPassageiros').type('3000000')
    cy.get('#MediaPassageiros').should('have.value', '3000000')
  })

  it('Teste Energia', () => {
    cy.get('#ConsumoEnergia').type('3000000')
    cy.get('#ConsumoEnergia').should('have.value', '3000000')
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