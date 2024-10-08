import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './pages/Home.tsx';
import { createTheme, MantineProvider, virtualColor } from '@mantine/core';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound.tsx';
import '@mantine/carousel/styles.css';


const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryShade: { light: 9, dark: 9 },
  colors: {
    darkmode: [
      '#1D2430',
      '#273040',
      '#303C4F',
      '#3A475F',
      '#43536F',
      '#4D5F7E',
      '#566B8E',
      '#60769E',
      '#6982AD',
      '#738EBD',
    ],
    primary: virtualColor({
      name: 'primary',
      dark: 'green',
      light: 'green',
    }),
  },
});

const router = createBrowserRouter([
  {
    path: '/project2',
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: '/project2/matchups',
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: '/project2/competition/:competition-name',
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: '*',
    element: <NotFound />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>,
);
