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