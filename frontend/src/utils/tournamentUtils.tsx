import { LoaderFunction, LoaderFunctionArgs, redirect } from 'react-router-dom';

// List of valid tournaments
const validTournaments = [
    "FIFA World Cup",
    "Euros",
    "Copa America",
    "Asian Cup",
    "African Cup",
];

// Loader function to check if the competition is valid, if not redirect to 404 page
export const isCompetitionValid: LoaderFunction = ({ params }: LoaderFunctionArgs) => {
    const { tournamentName } = params;

    if(tournamentName === undefined) return redirect('/project2/not-found');

    const cleanTournamentName = tournamentName.replace(/-/g, ' ');

    if (typeof cleanTournamentName === 'string' && validTournaments.includes(cleanTournamentName)) {
      return null; // Valid tournament, proceed as normal
    }
    return redirect('/project2/not-found'); // Invalid tournament, redirect to 404 page
  };