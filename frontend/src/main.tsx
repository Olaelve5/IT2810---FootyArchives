import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { RouterProvider } from 'react-router-dom';
import '@mantine/carousel/styles.css';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import theme from './config/theme.ts';
import router from './config/router.tsx';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/apolloClient.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <RouterProvider router={router} />
      </MantineProvider>   
    </ApolloProvider>
  </StrictMode>,
);
