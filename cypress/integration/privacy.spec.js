
//ultilizando a biblioteca loadash do js com a função times que executa um teste na quantidade de vezes que definimos
Cypress._.times(5, () =>{
    it('testa a página da política de privacidade de forma independente', () => {
        cy.visit('./src/privacy.html');
        cy.contains('Talking About Testing').should('be.visible');
        })
})