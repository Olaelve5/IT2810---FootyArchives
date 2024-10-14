import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './pages/Home.tsx';
import { createTheme, MantineProvider, virtualColor } from '@mantine/core';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound.tsx';
import Competition from './pages/Tournament.tsx';
import Country from './pages/Country.tsx';
import { isCompetitionValid } from './utils/tournamentUtils.tsx';
import Matchup from './pages/Matchup.tsx';
import '@mantine/carousel/styles.css';
import Matchups from './pages/Matchups.tsx';


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
    element: <Matchups />,
    errorElement: <NotFound />,
  },
  {
    path: '/project2/tournament/:tournamentName',
    element: <Competition />,
    loader: isCompetitionValid,
    errorElement: <NotFound />,
  },
  {
    path: '/project2/matchup/:mathupId',
    element: <Matchup />,
    errorElement: <NotFound />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/project2/Country/:countryName',
    element: <Country />,
    errorElement: <NotFound />,

  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>,
);
