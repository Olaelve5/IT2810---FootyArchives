import { screen } from '@testing-library/react';
import Result from '../pages/Result';
import '@testing-library/jest-dom';
import { renderWithProviders } from './renderWithProviders';
import { vi } from 'vitest';
import { useParams } from 'react-router-dom';
import { mockResultData } from './mocked-data/mockedResultData';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

describe('Result Page Tests', () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ resultId: '123' });
  });

  it('renders correctly with mocked data', async () => {
    // Render the component wrapped in MockedProvider
    const { container } = renderWithProviders(<Result />, { mocks: mockResultData });

    // Wait for the component to render the mock data
    expect(await screen.findByText('Team A')).toBeInTheDocument();

    // Normalize class names for snapshot
    const normalizedHTML = container.innerHTML.replace(/mantine-[a-z0-9]+/g, 'mantine-class');

    // Assert snapshot
    expect(normalizedHTML).toMatchSnapshot();
  });
});