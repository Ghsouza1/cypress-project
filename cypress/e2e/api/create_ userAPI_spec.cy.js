/// <reference types="cypress" />

/*
TO DO 
- adicionar report
- refatorar api testes
- refatorar ui testes
- N browser
- Tests run against a testing service (SauceLabs, BrowserStack or similar)
- Tests run against mobile browsers
*/

import {
    fakerPerson
} from '../../support/test-helpers';

let person = fakerPerson();

before(() => {
    cy.request('POST', '/api/reset')
})

describe('Trello', () => {
    it('Create an user - API', () => {
        const options = {
            method: 'POST',
            url: '/signup',
            body: {
                "email": person.email,
                "password": person.password
            },
            failOnStatusCode: false
        }

        cy.request(options).then((res) => {
            expect(res.status).to.eq(201);
        })

        cy
            .visit('/')

        const board = {
            method: 'POST',
            url: '/api/boards',
            body: {
                "name": person.name
            },
            failOnStatusCode: false
        }

        cy.request(board).then((res) => {
            expect(res.status).to.eq(201);
        })

        cy.get('[data-cy=board-item]')
            .should('be.visible')

        cy.get('[data-cy=board-item] > .board_title')
            .should('be.visible')
            .contains(person.name)
    });
});