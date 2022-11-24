Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Elton');
        cy.get('#lastName').type('Felix');
        cy.get('#email').type('elton@gmail.com');
        cy.get('#open-text-area').type('test'); 
        cy.contains('button', 'Enviar').click();
})