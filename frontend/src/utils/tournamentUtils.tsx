import { LoaderFunction, LoaderFunctionArgs, redirect } from 'react-router-dom';

export const tournamentData = [
  {
    name: 'FIFA World Cup',
    link: 'FIFA World Cup',
    color: 'yellow',
  },
  {
    name: 'UEFA Euro',
    link: 'UEFA Euro',
    color: 'blue',
  },
  {
    name: 'Copa América',
    link: 'Copa América',
    color: 'orange',
  },
  {
    name: 'AFC Asian Cup',
    link: 'AFC Asian Cup',
    color: 'red',
  },
  {
    name: 'African Cup of Nations',
    link: 'African Cup of Nations',
    color: 'green',
  },
];

// List of valid tournaments
const validTournaments = ['FIFA World Cup', 'UEFA Euro', 'Copa América', 'AFC Asian Cup', 'African Cup of Nations'];

// Loader function to check if the competition is valid, if not redirect to 404 page
export const isCompetitionValid: LoaderFunction = ({ params }: LoaderFunctionArgs) => {
  const { tournamentName } = params;

  if (tournamentName === undefined) return redirect('/project2/not-found');

  const cleanTournamentName = tournamentName.replace(/-/g, ' ');

  if (typeof cleanTournamentName === 'string' && validTournaments.includes(cleanTournamentName)) {
    return null; // Valid tournament, proceed as normal
  }
  return redirect('/project2/not-found'); // Invalid tournament, redirect to 404 page
};
