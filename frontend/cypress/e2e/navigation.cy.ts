/// <reference types="cypress" />

// This file contains tests for navigation and routing in the application, both by clicking on links and by searching

describe('Test of navigation and routing', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Tests initial page load', () => {
    cy.contains('h1', 'Footy');
  });

  it('Tests navigation and routing to tournaments', () => {
    const tournamentName = 'FIFA World Cup';
    const encodedTournamentName = encodeURIComponent(tournamentName);

    cy.contains(tournamentName).click();

    // Assert the encoded URL to ensure compatibility across browsers
    cy.url().should('include', `/tournament/${encodedTournamentName}`);
    cy.contains('h1', tournamentName);

    // Navigate back to the home page
    cy.contains('Home').click();
    cy.url().should('eq', 'http://localhost:5173/project2');

    // Navigate back to another tournament page
    const anotherTournamentName = 'UEFA Euro';
    const encodedAnotherTournamentName = encodeURIComponent(anotherTournamentName);

    cy.contains(anotherTournamentName).click();
    cy.url().should('include', `/tournament/${encodedAnotherTournamentName}`);
    cy.contains('h1', anotherTournamentName);
  });

  it('Tests navigation and routing to matchups-search', () => {
    cy.contains('Browse Matchups').click();
    cy.url().should('include', '/matchups');
    cy.contains('h2', 'Matchups');
  });

  // Test API calls combined with navigation
  it('Tests navigation to nation page with API call', () => {
    const nationName = 'Brazil';
    const encodedNationName = encodeURIComponent(nationName);

    cy.contains(nationName).click();
    cy.url().should('include', `/nation/${encodedNationName}`);
    cy.contains('h1', nationName);
  });

  it('Tests navigation to matchups page with API call', () => {
    cy.contains('p', '11.04.2001').click();

    cy.url().should('include', '/matchup');

    // Assert that the page has loaded and contains the first goal scorer
    cy.contains('Con Boutsianis');

    // Navigate back to the home page
    cy.contains('Home').click();
    cy.url().should('eq', 'http://localhost:5173/project2');
  });
});
