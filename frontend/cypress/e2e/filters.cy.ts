/// <reference types="cypress" />

// This file tests the filters on the matchup search page

describe('Test of filters on the matchup search page', () => {
  beforeEach(() => {
    cy.visit('/matchups');
  });

  it('Tests that the filters open and close', () => {
    cy.get('button').contains('Filters').click();
    cy.contains('h2', 'Filters');

    // Close the filters with the close button from mantine
    cy.get('.m_b5489c3c > .mantine-focus-auto').click();
    cy.contains('h2', 'Filters').should('not.exist');
  });

  it('Tests that the filters can be edited and reset', () => {
    cy.get('button').contains('Filters').click();

    // Add a country filter
    cy.get('input[placeholder="E.g. Norway"]').type('Norway');
    cy.get('div[value="Norway"]').click();
    cy.get('[aria-label="Selected Norway pill"]').should('exist');

    // Add a tournament filter
    cy.get('input[placeholder="E.g. FIFA World Cup"]').type('FIFA World Cup');
    cy.get('div[value="FIFA World Cup"]').click();
    cy.get('[aria-label="Selected FIFA World Cup pill"]').should('exist');
    cy.contains('h2', 'Filters').click();

    // Add a year filter
    cy.get('input[value=1872]').clear().type('2000');
    cy.get('input[value=2024]').clear().type('2022');
    cy.get('input[value=2022]').should('exist');
    cy.get('input[value=2000]').should('exist');

    // Test the reset button
    cy.get('button').contains('Clear').click();
    cy.get('[aria-label="Selected Norway pill"]').should('not.exist');
    cy.get('[aria-label="Selected FIFA World Cup pill"]').should('not.exist');
    cy.get('input[value=1872]').should('exist');
    cy.get('input[value=2024]').should('exist');
  });

  // Test API fetch of results based on filters
  it('Tests all filters applied and that data is fetched + naviagtion persistence', () => {
    cy.get('button').contains('Filters').click();

    // Select Norway and Brazil
    cy.get('input[placeholder="E.g. Norway"]').type('Norway');
    cy.get('div[value="Norway"]').click();

    cy.get('input[placeholder="E.g. Norway"]').clear().type('Brazil');
    cy.get('div[value="Brazil"]').click();

    // Select FIFA World Cup
    cy.get('input[placeholder="E.g. FIFA World Cup"]').type('FIFA World Cup');
    cy.get('div[value="FIFA World Cup"]').click();
    cy.contains('h2', 'Filters').click();

    // Set year to be 1998
    cy.get('input[value=1872]').clear().type('1998');
    cy.get('input[value=2024]').clear().type('1998');

    // Set exclusive swith to be true
    cy.get('[aria-label="Exclusive switch"]').click();

    cy.get('button').contains('Apply').click();
    cy.contains('p', 'Brazil').should('exist');
    cy.contains('p', 'Norway').should('exist');
    cy.contains('p', '23.06.1998').should('exist');

    // Verify that the exclusive swith worked
    // This matchup will be included if not
    cy.contains('p', 'France vs Brazil').should('not.exist');

    // Navigate to another page and back
    cy.get('a').contains('Home').click();
    cy.get('a').contains('Matchups').click();
    cy.contains('p', 'Brazil').should('exist');
    cy.contains('p', 'Norway').should('exist');
    cy.contains('p', '23.06.1998').should('exist');
  });

  it('Tests if filters are consistent if filters popup is closed and opened again', () => {
    cy.get('button').contains('Filters').click();

    cy.get('input[placeholder="E.g. Norway"]').type('Norway');
    cy.get('div[value="Norway"]').click();
    cy.get('[aria-label="Selected Norway pill"]').should('exist');

    // Apply filter and check if a matchup with norway exists
    cy.get('button').contains('Apply').click();
    cy.contains('Norway');

    // open filters again and check if filters are still there
    cy.get('button').contains('Filters').click();
    cy.get('[aria-label="Selected Norway pill"]').should('exist');

    // Clear filters and close popup
    cy.get('button').contains('Clear').click();
    cy.get('[aria-label="Selected Norway pill"]').should('not.exist');
    cy.get('.m_b5489c3c > .mantine-focus-auto').click();
    cy.contains('h2', 'Filters').should('not.exist');

    // open filters once again and check if filters are still there
    cy.get('button').contains('Filters').click();
    cy.get('[aria-label="Selected Norway pill"]').should('exist');
  });
});
