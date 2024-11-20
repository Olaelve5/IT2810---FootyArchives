import { screen } from '@testing-library/react';
import Tournament from '../pages/Tournament';
import '@testing-library/jest-dom';
import { renderWithProviders } from './renderWithProviders';
import { vi } from 'vitest';
import { useParams } from 'react-router-dom';
import { mockTournamentData } from './mocked-data/mockedTournamentData';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

describe('Tournament Page Tests', () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ tournamentName: 'UEFA Nations League' });
  });

  it('renders correctly with mocked data', async () => {
    // Render the component wrapped in MockedProvider
    const { container } = renderWithProviders(<Tournament />, { mocks: mockTournamentData });

    // Wait for the component to render the mock data
    expect(await screen.findByText('UEFA Nations League')).toBeInTheDocument();

    // Normalize class names for snapshot
    const normalizedHTML = container.innerHTML.replace(/mantine-[a-z0-9]+/g, 'mantine-class');

    // Assert snapshot
    expect(normalizedHTML).toMatchSnapshot();
  });
});
