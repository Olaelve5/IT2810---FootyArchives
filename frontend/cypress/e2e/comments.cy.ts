/// <reference types="cypress" />

// This file tests the comments on matchups sites with mocked data
describe('Test of comments on the matchup page', () => {

    beforeEach(() => {
      // Intercept the getComments GraphQL query
      cy.intercept('POST', '/graphql', (req) => {
        if (req.body.operationName === 'getComments') {
          req.reply({
            fixture: 'getComments.json' // Respond with the mocked data
          });
        }
      }).as('getComments');
    });
  
    it('should display comments', () => {
      // Visit the page where comments are displayed
      cy.visit('/matchup/670d142ccc20a61eeae743ea');
      
      // Assert that the mocked comments are displayed
      cy.contains('John Doe');
      cy.contains('This is a test comment.');
      cy.contains('Jane Smith');
      cy.contains('Another test comment.');
    });
  
    it('should allow posting a new comment and display it', () => {
        const resultID = '670d142ccc20a61eeae743ea';
      // Intercept the AddComment mutation
      cy.intercept('POST', '/graphql', (req) => {
        if (req.body.operationName === 'AddComment') {
          // Verify the request payload matches expectations
          expect(req.body.variables).to.deep.equal({
            resultId: resultID,
            comment: 'Canada good',
            userName: 'canadian-sausage',
          });
  
          // Mock the server's response
          req.reply({
            data: {
              addComment: {
                user_name: 'canadian-sausage',
                date: new Date().toISOString(),
                comment: 'Canada good',
                result_id: resultID,
                __typename: 'Comment',
              },
            },
          });
        }
      }).as('AddComment');
  
      // Visit the page
      cy.visit(`/matchup/${resultID}`);
  
      // Open the comment modal
      cy.contains('Add comment').click();
  
      // Fill out the comment form
      cy.get('input[aria-label="Enter your username"]').type('canadian-sausage');
      cy.get('textarea[aria-label="Write a comment"]').type('Canada good');
  
      // Submit the comment
      cy.contains('button', 'Post comment').click();
  
      // Wait for the AddComment mutation
      cy.wait('@AddComment');
  
      // Assert the new comment appears on the page
      cy.contains('canadian-sausage');
      cy.contains('Canada good');
    });
  });
  