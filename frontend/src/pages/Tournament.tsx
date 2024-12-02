import { useParams, useNavigate } from 'react-router-dom';
import MatchcardCarousel from '../components/Carousel/Carousel';
import classes from '../styles/Tournament/Tournament.module.css';
import { useEffect, useState } from 'react';
import { GET_TOURNAMENTS } from '../graphql/tournamentOperations';
import { useQuery } from '@apollo/client';
import { TournamentType } from '../types/TournamentType';
import { Button, Loader, useMantineTheme } from '@mantine/core';
import { tournamentData } from '../utils/tournamentUtils';
import { IconTrophyFilled } from '@tabler/icons-react';
import DescriptionButton from '../components/Tournament/DescriptionButton';
import Layout from '../components/Layout';
import { recentResultsSort } from '../utils/sortOptions';

export default function Tournament() {
  const { tournamentName } = useParams<{ tournamentName: string }>();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [tournaments, setTournaments] = useState<TournamentType[]>([]);
  const [yearRange, setYearRange] = useState<number[]>([]);
  const theme = useMantineTheme();

  const iconColor = () => {
    const color = tournamentData.find((item) => item.name === tournamentName)?.color;
    return color ? theme.colors[color][8] : theme.colors.primary[5];
  };

  // Fetch tournaments based on tournamentName
  const { data, loading, error, fetchMore } = useQuery(GET_TOURNAMENTS, {
    variables: { tournamentName: tournamentName, page: page },
    onError: (error) => console.log('Error:', error),
  });

  // Initialize tournaments
  if (data && tournaments.length === 0) {
    setTournaments(data.tournaments.paginatedResults);
    setTotalCount(data.tournaments.totalCount);
    setYearRange([data.tournaments.startYear, data.tournaments.endYear]);
  }

  // Fetch more tournaments when button is clicked
  const handleClick = async () => {
    const { data } = await fetchMore({
      variables: { tournamentName: tournamentName, page: page + 1 },
    });

    if (data) {
      setPage((prevPage) => prevPage + 1);
      setTournaments((prevTournaments) => [...prevTournaments, ...data.tournaments.paginatedResults]);
    }
  };

  // Reset tournaments when tournamentName changes
  useEffect(() => {
    setTournaments([]);
    setPage(1);
  }, [tournamentName]);

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const carousels = tournaments.map((tournament: TournamentType) => {
    return (
      <div key={tournament._id}>
        <MatchcardCarousel
          cardType={'match'}
          data={tournament.results}
          titleEn={tournament.year.toString()}
          titleNo={tournament.year.toString()}
          loading={loading}
          error={error}
          sort={recentResultsSort}
          filters={{
            yearRange: { startYear: tournament.year, endYear: tournament.year },
            tournaments: [tournamentName ? tournamentName : ''],
          }}
        />
      </div>
    );
  });

  if (error) {
    console.error(error);
    navigate('/project/not-found');
  }

  return (
    <Layout>
      <div className={classes.titleContainer}>
        <IconTrophyFilled stroke={1.5} size={45} color={iconColor()} className={classes.iconTrophy} />
        <h1>{tournamentName}</h1>
      </div>
      <DescriptionButton
        startYear={yearRange[0]}
        endYear={yearRange[1]}
        tournamentName={tournamentName || 'Unknown tournament'}
      />
      {loading && <Loader size={25} color={theme.colors.primary[5]} />}
      <div className={classes.carouselSection}>{carousels}</div>
      <Button onClick={handleClick} className={classes.loadButton} radius="xl" disabled={4 * page > totalCount}>
        Load More
      </Button>
    </Layout>
  );
}
