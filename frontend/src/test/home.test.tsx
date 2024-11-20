import { screen } from '@testing-library/react';
import Home from '../pages/Home';
import '@testing-library/jest-dom';
import { renderWithProviders } from './renderWithProviders';
import { mockHomeData } from './mocked-data/mockedHomeData';

describe('Home Page Tests', () => {
  it('renders correctly with mocked data', async () => {
    // Render the component wrapped in MockedProvider
    const { container } = renderWithProviders(<Home />, { mocks: mockHomeData });

    // Wait for the component to render the mock data
    expect(await screen.findByText('Top teams')).toBeInTheDocument();
    expect(await screen.findByText('Recent matchups')).toBeInTheDocument();
    expect(await screen.findByText('Biggest wins')).toBeInTheDocument();

    // Normalize class names for snapshot
    const normalizedHTML = container.innerHTML.replace(/mantine-[a-z0-9]+/g, 'mantine-class');

    // Assert snapshot
    expect(normalizedHTML).toMatchSnapshot();
  });
});
