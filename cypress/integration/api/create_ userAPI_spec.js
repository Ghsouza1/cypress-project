/// <reference types="cypress" />

import {
    fakerPerson
} from '../../support/test-helpers';

let person = fakerPerson();

beforeEach(() => {
    cy.request('POST', '/api/reset')
})

describe('Trello', () => {
    it('Create an user - API', () => {
        const options = {
            method: 'POST',
            url: '/signup', //signup
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