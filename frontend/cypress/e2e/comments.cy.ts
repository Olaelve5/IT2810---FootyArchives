/// <reference types="cypress" />

// This file tests the comments on matchups sites with mocked data
describe('Test of comments on the matchup page', () => {
  beforeEach(() => {
    // Intercept the getComments GraphQL query
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'getComments') {
        req.reply({
          fixture: 'getComments.json', // Respond with the mocked data
        });
      }
    }).as('getComments');
  });

  it('should display comments', () => {
    // Visit the page where comments are displayed
    cy.visit('/matchup/674c853c1dde3e61ff21077d');

    // Assert that the mocked comments are displayed
    cy.contains('John Doe');
    cy.contains('This is a test');
    cy.contains('Jane Smith');
    cy.contains('This is another test');
  });

  it('should allow posting, editing and deleting a new comment', () => {
    const resultID = '674c853c1dde3e61ff21077d';
    const userID = '6750569e4dd64d6a93001c99';

    // Intercept the AddComment mutation
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'AddComment') {
        // Verify the request payload matches expectations
        expect(req.body.variables).to.deep.equal({
          resultId: resultID,
          comment: 'Canada good',
          username: 'canadaman',
        });

        // Mock the server's response
        req.reply({
          data: {
            addComment: {
              id: '6750ba58460a90bf99251afb',
              user: {
                id: userID,
                username: 'canadaman',
              },
              date: new Date().toISOString(),
              comment: 'Canada good',
              result_id: resultID,
              __typename: 'Comment',
            },
          },
        });
      }
    }).as('AddComment');

    // Intecept the EditComment mutation
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'EditComment') {
        // Verify the request payload matches expectations
        expect(req.body.variables).to.deep.equal({
          commentId: '6750ba58460a90bf99251afb',
          comment: 'Canada bad',
        });

        // Mock the server's response
        req.reply({
          data: {
            editComment: {
              id: '6750ba58460a90bf99251afb',
              user: {
                id: userID,
                username: 'canadaman',
              },
              date: new Date().toISOString(),
              comment: 'Canada bad',
              result_id: resultID,
              __typename: 'Comment',
            },
          },
        });
      }
    }).as('EditComment');

    // Intercept the DeleteComment mutation
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'DeleteComment') {
        // Verify the request payload matches expectations
        expect(req.body.variables).to.deep.equal({
          commentId: '6750ba58460a90bf99251afb',
        });

        // Mock the server's response
        req.reply({
          data: {
            deleteComment: true,
          },
        });
      }
    }).as('DeleteComment');

    // Visit the page
    cy.visit(`/matchup/${resultID}`);

    // Open the comment modal
    cy.contains('Add comment').click();

    // Fill out the comment form
    cy.get('input[aria-label="Enter your username"]').type('canadaman');
    cy.get('textarea[aria-label="Write a comment"]').type('Canada good');

    // Submit the comment
    cy.contains('button', 'Post comment').click();

    // Wait for the AddComment mutation
    cy.wait('@AddComment');

    // Assert the new comment appears on the page
    cy.contains('canadaman');
    cy.contains('Canada good');

    // Edit the comment
    cy.get('button[aria-label="Edit comment"]').click();
    cy.get('textarea[aria-label="Write a comment"]').clear().type('Canada bad');
    cy.contains('button', 'Edit comment').click();

    // Wait for the EditComment mutation
    cy.wait('@EditComment');

    // Assert the edited comment appears on the page
    cy.contains('canadaman');
    cy.contains('Canada bad');

    // Delete the comment
    cy.get('button[aria-label="Delete comment"]').click();
    cy.contains('button', 'Yes').click();

    // Wait for the DeleteComment mutation
    cy.wait('@DeleteComment');

    // Assert the comment is removed from the page
    cy.contains('canadaman').should('not.exist');
    cy.contains('Canada bad').should('not.exist');
  });
});
