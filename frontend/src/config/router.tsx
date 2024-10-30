import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home.tsx';
import NotFound from '../pages/NotFound.tsx';
import Tournament from '../pages/Tournament.tsx';
import Result from '../pages/Result.tsx';
import Matchups from '../pages/Matchups.tsx'
import Nation from '../pages/Nation.tsx';
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
    path: '/project2/matchup/:resultId',
    element: <Result/>,
    errorElement: <NotFound />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/project2/nation/:nationName',
    element: <Nation />,
    errorElement: <NotFound />,
  },
]);

export default router;
