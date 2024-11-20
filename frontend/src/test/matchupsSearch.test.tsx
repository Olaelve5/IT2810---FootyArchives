import { screen } from '@testing-library/react';
import Matchups from '../pages/MatchupsSearch';
import '@testing-library/jest-dom';
import { renderWithProviders } from './renderWithProviders';
import { mockMatchupSearchData } from './mocked-data/mockedMatchupSearchData';

describe('Matchups Search Page Tests', () => {
  it('renders correctly with mocked data', async () => {
    // Render the component wrapped in MockedProvider
    const { container } = renderWithProviders(<Matchups />, { mocks: mockMatchupSearchData });

    // Wait for the component to render the mock data
    expect(await screen.findByText('Matchups')).toBeInTheDocument();

    // Normalize class names for snapshot
    const normalizedHTML = container.innerHTML.replace(/mantine-[a-z0-9]+/g, 'mantine-class');

    // Assert snapshot
    expect(normalizedHTML).toMatchSnapshot();
  });
});
