/**
 * Requirements:-
 *  1. toggle form button should be visible
 *  2. add todo form should be visible when clicking on the plus button
 *  3. add todo form should disappear when clicking on the close button
 *  4. when a todo is added, it should appear in the pending list
 *  5. when a todo is deleted, it should not be present anymore
 *  6. when a todo is completed, it should be moved to the completed list
 */

import { faker } from '@faker-js/faker';

describe('todo', () => {
  it('/todo', () => {
    cy.visit('/');

    cy.log('toggle form button should be visible');
    cy.get('[data-testid="toggle-form-btn"]').should('be.visible');

    cy.log('add todo form should be visible when clicking on the plus button');
    cy.get('[data-testid="toggle-form-btn"]').click();
    cy.get('[data-testid="add-todo-form"]').should('exist');

    cy.log('add todo form should disappear when clicking on the close button');
    cy.get('[data-testid="toggle-form-btn"]').click();
    cy.get('[data-testid="add-todo-form"]').should('not.exist');

    cy.log('when a todo is added, it should appear in the pending list');
    cy.get('[data-testid="toggle-form-btn"]').click();
    let todoTitle = faker.lorem.lines(1);
    cy.get('textarea').type(todoTitle);
    cy.contains('button', 'ADD').click();
    cy.contains('p', todoTitle);

    cy.log('when a todo is deleted, it should not be present anymore');
    cy.contains('[data-testid="todo"]', todoTitle).within(() => {
      cy.get('[data-testid="todo-delete-btn"]').click();
      cy.contains('p', todoTitle).should('not.exist');
    });

    cy.log('when a todo is completed, it should be moved to the completed list');
    todoTitle = faker.lorem.lines(1);
    cy.get('textarea').type(todoTitle);
    cy.contains('button', 'ADD').click();
    cy.contains('[data-testid="todo"]', todoTitle).within(() => {
      cy.get('[data-testid="todo-markascomplete-btn"]').click();
    });

    cy.get('[data-testid="completed-todos"]').within(() => {
      cy.contains('i', todoTitle).should('exist');
    });
  });
});
