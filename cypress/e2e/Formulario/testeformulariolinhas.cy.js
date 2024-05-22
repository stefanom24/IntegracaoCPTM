/// <reference types="cypress" />

describe('Navegação', () => {
  beforeEach(() => {
      cy.visit('http://localhost:3000/linhas')
  })

 

  it('Teste Linha', () => {
    cy.get('#NomeLinha').type('Linha 1')
    cy.get('#Estacoes').type('7')
    cy.get('#Extensao').type('10')
    cy.get('#Velocidade').select('Nivel 2')
    cy.get('#Carga').select('Sim')
    cy.get('#HW').type('10099')
    cy.get('#Viagens').type('10')
    cy.get('#MediaPassageiros').type('100')
    cy.get('#ConsumoEnergia').type('100')
    cy.get('#enviar').click()
    //cy.get('.form-control').within(() => {
    //  cy.get('input:first').should('have.attr', 'placeholder', 'Email')
    //  cy.get('input:last').should('have.attr', 'placeholder', 'Password')
    //})
  })

  it('Teste Linha 2', () => {
    cy.get('#NomeLinha').type('10')
    cy.get('#Estacoes').type('7')
    cy.get('#Extensao').type('10')
    cy.get('#Velocidade').select('Nivel 2')
    cy.get('#Carga').select('Sim')
    cy.get('#HW').type('10099')
    cy.get('#Viagens').type('10')
    cy.get('#MediaPassageiros').type('100')
    cy.get('#ConsumoEnergia').type('100')
    cy.get('#formLinha').submit()
    //cy.get('.form-control').within(() => {
    //  cy.get('input:first').should('have.attr', 'placeholder', 'Email')
    //  cy.get('input:last').should('have.attr', 'placeholder', 'Password')
    //})
  })

})