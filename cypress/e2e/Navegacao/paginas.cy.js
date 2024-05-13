/// <reference types="cypress" />

describe('Navegação', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })
    
    it('navegar para a página de historico', () => {
        cy.get('.navbar-nav').contains('Histórico').click()
        cy.url().should('include', 'historico')
        
    })

    it('navegar para a página de cadastro de trens', () => {
        cy.get('.navbar-nav').contains('Cadastros').click()
        cy.get('.dropdown-menu').contains('Cadastro de Trens').click()
        cy.url().should('include', 'trens')
        
    })

    it('navegar para a página de cadastro de linhas', () => {
        cy.get('.navbar-nav').contains('Cadastros').click()
        cy.get('.dropdown-menu').contains('Cadastro de Linhas').click()
        cy.url().should('include', 'linhas')
        
    })

    it('navegar para a página de cadastro de estacoes', () => {
        cy.get('.navbar-nav').contains('Cadastros').click()
        cy.get('.dropdown-menu').contains('Cadastro de Estações').click()
        cy.url().should('include', 'estacoes')
        
    })

    it('navegar para a página de registro de ocorrencias de trens', () => {
        cy.get('.navbar-nav').contains('Registro de Ocorrências').click()
        cy.get('.dropdown-menu').contains('Ocorrências de Trens').click()
        cy.url().should('include', 'ocoTrens')
    })

    it('navegar para a página de registro de ocorrencias de linhas', () => {
        cy.get('.navbar-nav').contains('Registro de Ocorrências').click()
        cy.get('.dropdown-menu').contains('Ocorrências de Linhas').click()
        cy.url().should('include', 'ocoLinhas')
    })

    it('navegar para a página de registro de ocorrencias de estacoes', () => {
        cy.get('.navbar-nav').contains('Registro de Ocorrências').click()
        cy.get('.dropdown-menu').contains('Ocorrências de Estações').click()
        cy.url().should('include', 'ocoEstacoes')
    })
})