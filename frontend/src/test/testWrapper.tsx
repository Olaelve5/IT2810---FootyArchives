import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { MantineProvider } from '@mantine/core';
import theme from '../config/theme';

interface TestWrapperProps {
  children: React.ReactNode;
  mocks?: MockedResponse[]; // Correctly typed Apollo mocks
}

export const TestWrapper = ({ children, mocks = [] }: TestWrapperProps) => {
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <MantineProvider
          defaultColorScheme="dark"
          theme={theme}
        >
          {children}
        </MantineProvider>
      </MemoryRouter>
    </MockedProvider>
  );
};
