//*import { it } from "mocha"
/// <reference types="cypress" />

describe("Chamada API - exemplos", () => {

  it("API - GET StawWars", () => {

    cy.request('GET', 'https://swapi.dev/api/people/1/', 
      { }).then((response) => {
      //*       { name: 'Jane' }).then((response) => {
      // response.body is automatically serialized into JSON
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('name', 'Luke Skywalker') // 1= Luke / true
      expect(response.body).to.have.property('name', 'C-3PO') // 2= C-3PO / false
    })    

  })

  it("API - Get Exemplo", () => {
    cy.request('https://jsonplaceholder.cypress.io/comments').as('comments')

    cy.get('@comments').should((response) => {
      expect(response.body).to.have.length(500)
      expect(response).to.have.property('headers')
      expect(response).to.have.property('duration')
    })
  })

  it("API - Get VIA v01", () => {
    cy.request({
      auth: {
        'Bearer': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.HEAFzxWNRFJeyY7PCPzhqtB0UX68R6__sfrxQccRaFs',
        'Content-Type': 'application/json', 
      },
      url: 'http://hlg-oms-corporativo.api-cnova.com.br/inventario/v1/estoques',
      qs: {
        idcompanhia:21,
        skus:1700220,
        tiposEstoque:'N',
        filiais:33041260094711,
        restricoes:'WN',
      }
    }).as('comments')

    cy.get('@comments').should((response) => {
      expect(response.body).to.have.length(500)
      expect(response).to.have.property('headers')
      expect(response).to.have.property('duration')
    })
  })

  //* ------------------------------------------------------------------------
  //*    FUNCIONAL COMPLETA - GET
  //* ------------------------------------------------------------------------
  it("API - Get VIA v02", () => {
    const options = {
      method: "GET",
      url: 'http://hlg-oms-corporativo.api-cnova.com.br/inventario/v1/estoques',
      headers: {
        'Bearer': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.HEAFzxWNRFJeyY7PCPzhqtB0UX68R6__sfrxQccRaFs',
        'Content-Type': 'application/json'
      },
      qs: {
        idcompanhia:21,
        skus:1700220,
        tiposEstoque:'N',
        filiais:33041260094711,
        restricoes:'WN',
      },
      json: true
    }
    cy.request(options).should((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('valido', true)
      expect(response.body).to.have.property('estoques')
      expect(response.body.estoques[0]).to.have.property('total', 40)
    })
  })

  //* -----------------------------------------------------------------------

  it('API - POST - Exemplo 1', () => {
    // will execute request
    // https://jsonplaceholder.cypress.io/comments?postId=1&id=3
    cy.request({
      url: 'https://jsonplaceholder.cypress.io/comments',
      qs: {
        postId: 1,
        id: 3,
      },
    })
    .its('body')
    .should('be.an', 'array')
    .and('have.length', 1)
    .its('0') // yields first element of the array
    .should('contain', {
      postId: 1,
      id: 3,
    })
  })

  //* Consulte mais em:
  //* https://github.com/request/request#http-authentication
  //* 

  it('API - POST - Exemplo 2', () => {
    cy.request({
      url: 'http://hlg-oms-corporativo.api-cnova.com.br/inventario/v1/estoques',
      auth: {
        'Bearer': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.HEAFzxWNRFJeyY7PCPzhqtB0UX68R6__sfrxQccRaFs',
        'Content-Type': 'application/json', 
      },
      qs: {
        idcompanhia:21,
        skus:1700220,
        tiposEstoque:'N',
        filiais:33041260094711,
        restricoes:'WN',
      },
    })
    .its('body')
    .should('be.an', 'array')
    .and('have.length', 1)
    .its('0') // yields first element of the array
    .should('contain', {
      postId: 1,
      id: 3,
    })
  })
  //* ------------------------------------------------------------------------
  //*    FUNCIONAL COMPLETA - POST
  //* ------------------------------------------------------------------------
  it.only("API - POST VIA v01", () => {
    const options = {
      method: "POST",
      url: 'http://hlg-oms-corporativo.api-cnova.com.br/inventario/v1/estoques/reservas/canceladas',
      headers: {
        'x-client-id': 'c35440fa-d259-41c8-8a19-e253c461742e',
        'x-access-key': 'c30e24d1306fe2b8f6a0a2f31daa58124a020eef8a70f0907afa453300e0609t',
        'Content-Type': 'application/json'
      },
      body: {
          "idPedido": 500076621,
          "motivo": "B2B Cancelamento",
          "sincrona": true
     },
      json: true
    }
    cy.request(options).should((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('valid', true)
      expect(response.body).to.have.property('itens')
      expect(response.body.itens[0]).to.have.property('idSku')
    })
  })

})

  /* ------------- Exemplo: ---------------------------------
  cy
    .get('h1') // select by tag
    .get('.square') // select by class
    .get('#circle') // select by id
    .get('[shape="triangle"]') // select by attribute
    .get('@NomeAlias')   // select by previously alias name
  ---------------------------------------------------------- */
  