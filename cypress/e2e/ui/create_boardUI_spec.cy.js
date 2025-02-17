/// <reference types="cypress" />

import {
  fakerPerson
} from '../../support/test-helpers';

let id = '';
let person = fakerPerson();

beforeEach(() => {
  cy.request('POST', '/api/reset')
})

describe('Trello', () => {
  it('Create a Board - UI', () => {
    cy
      .intercept({
        method: 'POST',
        url: '/api/boards'
      }).as('createBoard')

    cy
      .visit('/')

    cy.addBoard(person.name)

    cy
      .wait('@createBoard')
      .then((board) => {
        expect(board.response.statusCode).to.eq(201)
        expect(board.request.body.name).to.eq(person.name)
        id = board.response.body.id;
        name = board.response.body.name
      })

    cy
      .visit('/board/' + id)

    cy
      .get('[data-cy="star"]')
      .invoke('show')
      .click()

    cy.get(':nth-child(2) > .board_item')
      .click()

    cy.get('[data-cy=add-list]')
      .click()

    cy.get('[data-cy=add-list-input]')
      .type(person.userName + '{enter}')

    cy.get('[data-cy=save]')
  });

});