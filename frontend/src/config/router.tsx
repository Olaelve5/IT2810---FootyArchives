import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home.tsx';
import NotFound from '../pages/NotFound.tsx';
import Tournament from '../pages/Tournament.tsx';
import Matchup from '../pages/Matchup.tsx';
import Matchups from '../pages/Matchups.tsx'
import Country from '../pages/Country.tsx';
import { isCompetitionValid } from '../utils/tournamentUtils.tsx';

const router = createBrowserRouter([
  {
    path: '/project2',
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: '/project2/matchups',
    element: <Matchups />,
    errorElement: <NotFound />,
  },
  {
    path: '/project2/tournament/:tournamentName',
    element: <Tournament />,
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
  },
]);

export default router;
