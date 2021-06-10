/// <reference types="cypress" />

import {
  fakerPerson
} from '../support/test-helpers';

let id = '';
let person = fakerPerson();

beforeEach(() => {
  cy.request('POST', '/api/reset')
})

describe('My Boards', () => {
  it('POST/Board', () => {
    cy
      .visit('/')

    const options = {
      method: 'POST',
      url: '/api/boards',
      body: {
        "name": person.name
      },
      failOnStatusCode: false
    }

    cy.request(options).then((res) => {
      expect(res.status).to.eq(201);
      id = res.body.id;
    })

    cy.get('[data-cy=board-item]')
      .should('be.visible')

    cy.get('[data-cy=board-item] > .board_title')
      .should('be.visible')
      .contains(person.name)
  });
});