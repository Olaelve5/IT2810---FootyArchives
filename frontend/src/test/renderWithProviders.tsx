import { render } from '@testing-library/react';
import { MockedResponse } from '@apollo/client/testing';
import { TestWrapper } from './testWrapper';

interface RenderOptions {
  mocks?: MockedResponse[]; // Apollo mocks type
}

export const renderWithProviders = (
  ui: React.ReactElement,
  { mocks = [], ...options }: RenderOptions = {}, // Include mocks in options
) => {
  return render(ui, {
    wrapper: ({ children }) => <TestWrapper mocks={mocks}>{children}</TestWrapper>,
    ...options,
  });
};
