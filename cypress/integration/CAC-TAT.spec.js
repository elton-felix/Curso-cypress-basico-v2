
///<reference types="Cypress" /> 



//dizemos que o cypress busque como referencia os tipos do cypress. assim podemos ver as assinaturas das funções e altocomplite


//primeiro argumento é descruisão do test e o segundo uma função onde vai conter os testes
describe('Central de Atendimento ao Cliente TAT', function () {

    beforeEach(() => {
        cy.visit('./src/index.html');
    })



    it('Verifica o titulo da aplicação', function () {
        cy.title().should('eq','Central de Atendimento ao Cliente TAT'); //should serve para verificações
                        //eq ou be.equal é como um assert
    })


    //.only nós definimos que só execute esse teste
    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'exercicio curso cypress, testando sobreescrever o delay, teste,exercicio curso cypress, testando sobreescrever o delay, teste,exercicio curso cypress, testando sobreescrever o delay, teste,exercicio curso cypress, testando sobreescrever o delay, teste,exercicio curso cypress, testando sobreescrever o delay, teste,exercicio curso cypress, testando sobreescrever o delay, teste,exercicio curso cypress, testando sobreescrever o delay, teste'
       
        cy.get('#firstName').type('Elton');
        cy.get('#lastName').type('Felix');
        cy.get('#email').type('elton@gmail.com');
        cy.get('#open-text-area').type(longText,  {delay: 0}); // ao utilizar o delay junto ao type, o cypress escreve quase que estantaneo, essa pratica é boa pra escrita de textos grandes;
        cy.contains('button', 'Enviar').click();

        
        cy.get('.success').should('be.visible');
})

//exercicio 2
it.only('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    
    cy.get('#firstName').type('Elton');
    cy.get('#lastName').type('Felix');
    cy.get('#email').type('eltomfelix@gmail.com');

    cy.get('#open-text-area').type('classe error');  
    cy.contains('button', 'Enviar').click();

    
    cy.get('.error').should('be.visible');
})

//exercicio 3
it('campo telefone continua vazio quando preenchido com valor não-númerico', function() {
    
    //tentando digitar um texto no campo telefone que só aceita valores numericos e verificando se o campo continuaq vazio
    cy.get('#phone')
    .type('eeeeaaa')
    .should('have.value', '');
   
})

//exercicio 4
it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    
    cy.get('#firstName').type('Elton');
    cy.get('#lastName').type('Felix');
    cy.get('#email').type('elton@gmail.com');
    cy.get('#phone-checkbox').check().should('be.checked'); 
    cy.get('#open-text-area').type('classe error'); 
    cy.contains('button', 'Enviar').click();

    
    cy.get('.error').should('be.visible');
})

//exercicio 5
it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
    
    cy.get('#firstName').type('Elton').should('have.value', 'Elton')
    .clear().should('have.value', '');
    cy.get('#lastName').type('Felix').should('have.value', 'Felix')
    .clear().should('have.value', '');
    cy.get('#email').type('elton@gmail.com').should('have.value', 'elton@gmail.com')
    .clear().should('have.value', '');
    cy.get('#phone').type('83986089270').should('have.value', '83986089270')
    .clear().should('have.value', '');

})

//exercicio 6
it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
    
   // cy.get('button[type="submit"]').click(); forma anterior que acessavamos o botão com o get

   cy.contains('button', 'Enviar').click();// com o contains nós podemos acessar o elemento tanto pelo seu seletor quanto pelo texto do elemento

    cy.get('.error').should('be.visible');
})

//exercicio 7
it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit();//criamos um comando customizado que esta contino no commands.js

    cy.get('.success').should('be.visible');
})
 
//exercicios Selecionando opções em campos de seleção suspensa

//exercicio
it('seleciona um produto (YouTube) por seu texto', () =>{
    cy.get('#product').select('YouTube').should('have.value', 'youtube');
})

//exercicio 1

it('seleciona um produto (Mentoria) por seu valor (value)', () =>{
    cy.get('#product').select('mentoria').should('have.value', 'mentoria');
})

//exercicio 2

it('seleciona um produto (Blog) por seu índice', () =>{
    cy.get('#product').select(1).should('have.value', 'blog');
})

//exercicios Marcando inputs do tipo radio

it('marca o tipo de atendimento "Feedback"', () =>{//para marcar um input radio ou checkbox utilizamos o .check()
    cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback');
})

//exercicio extra
it('marca cada tipo de atendimento', () =>{
    

    cy.get('input[type="radio"]').
    should('have.length', 3).//verificando a quantidade de elementos
    each(function($radio) {//each pega cada um desses elementos e recebe uma função que recebe uma variavel com todos os elementos encontrados
        cy.wrap($radio).check()//wrap empacota os elementos para podermos utilizar ele em comandos cypress
        cy.wrap($radio).should('be.checked')//be.checked verifica se o checkbox foi mesmo marcado
    })
})

//exercicios Marcando (e desmarcando) inputs do tipo checkbox

//exercicio 

it('marca ambos checkboxes, depois desmarca o último', () => {
    //quando colocamos um check e tem mais de 1 elemento ele marca todos
    cy.get('input[type="checkbox"]').check().should('be.checked').//verificando se o  check foi marcado
    last().//last pega o ultimo elemento dentro de um conjunto de elementos
    uncheck().//comendo para desmarcar o checkbox
    should('not.be.checked')//verificando se o check esta desmarcado

})

//exercicios Fazendo upload de arquivos com Cypress

//exercicio

it('seleciona um arquivo da pasta fixtures', () => {
    //should verifica que nenhum valor existe nesse input
    cy.get('input[type="file"]').should('not.have.value').selectFile('cypress/fixtures/example.json').should(function($input){
        expect($input[0].files[0].name).to.eq('example.json')//função q recebemos uma função que recebe o input como argumento e que verifica se o nome do primeiro arquivo do primeiro input é o especificado
    })
})

//exercicio extra 1
it('seleciona um arquivo simulando um drag-and-drop', () => {
    //drag-drop altera o comportamento do comando para imitar o usuario arrastando arquivos do SO para o navegado e soltando no campo selecionado
    cy.get('input[type="file"]').should('not.have.value').selectFile('cypress/fixtures/example.json', {action: 'drag-drop'}).then(input => {//apresentando uma forma diverente de verificação. tambem funcionaria para o teste anterior
        expect(input[0].files[0].name).to.eq('example.json')
    })
})

//exercicio extra 2
it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
    cy.fixture('example.json').as('sampleFile')//podemos alem de usar o caminho inteiro do arquivo ultilizar fixture e o alias para definir o nome do arquivo e assim chamae ele no selectFile
    cy.get('input[type="file"]').selectFile('@sampleFile').//@ mostra que estamos utilizando o alias
    should(function($input){
        expect($input[0].files[0].name).to.eq('example.json');
    })
})

//exercicios Lidando com links que abrem em outra aba

//exercicio
it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
cy.get('#privacy a').should('have.attr', 'target', '_blank')
//target com valor blanck defini que o link sera aberto em outra aba
//estamos verificando se no target da pagina o seu valor é _blank
})

//exercicio extra 1
it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a').invoke('removeAttr', 'target').click();//removendo o atributo target o link será aberto na mesma aba
    cy.contains('Talking About Testing').should('be.visible');//verificando se o texto no contains esta visivel
    })
 
   //exercicios  Simulando o viewport de um dispositivo móvel
   

})
