/// <reference types="cypress" />

/// <reference types="cypress" />

describe('Estações', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    });

    it('navegar para a página de cadastro de estacoes', () => {
        cy.get('.navbar-nav').contains('Cadastros').click();
        cy.get('.dropdown-menu').contains('Cadastro de Estações').click();
        cy.url().should('include', 'estacoes');
    });

    it('cadastrar estação', () => {
        cy.get('.navbar-nav').contains('Cadastros').click();
        cy.get('.dropdown-menu').contains('Cadastro de Estações').click();
        cy.url().should('include', 'estacoes');

        // Fill in the form fields.
        cy.get('#nome').type('Estação Teste');
        cy.get('#LinhaPertence').select('Linha 2');
        cy.get('#km').select('KM 2');

        // Intercept POST request before clicking the send button.
        cy.intercept('POST', '/registroEstacao').as('registroEstacao');

        cy.get('#estacao').submit();

        // Click the send button to submit the form.
        //cy.get('#enviar').click({ force: true });

        // Wait for the POST request and check the response.
        cy.wait('@registroEstacao').then((interception) => {
            expect(interception.response).to.exist;
            expect(interception.response.statusCode).to.equal(302);
        });
        

        // Optionally check if the session cookie exists.
        // cy.getCookie('cypress-session-cookie').should('exist');
    });
});
