/// <reference types="cypress" />

import {
    fakerPerson
} from '../support/test-helpers';

let person = fakerPerson();

beforeEach(() => {
    cy.request('POST', '/api/reset')
})

describe('Trello', () => {
    it('Create an user', () => {
        cy
            .intercept({
                method: 'POST',
                url: '/signup',
                failOnStatusCode: false
            }).as('createUser')

        cy
            .visit('/')

        cy.get('[data-cy=login-menu]')
            .invoke('show')
            .click()

        cy.get(':nth-child(2) > .LoginModule_logSignSwitch > a')
            .click()

        cy.get('[data-cy=signup-email]')
            .type(person.email)

        cy.get('[data-cy=signup-password]')
            .type(person.password)

        cy.get('[data-cy=signup]')
            .click()

        cy
            .wait('@createUser')
            .then((board) => {
                expect(board.response.statusCode).to.eq(201)
            })
    });
});