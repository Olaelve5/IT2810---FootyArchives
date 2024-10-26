import { useParams, useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar/SideBar';
import Navbar from '../components/Navbar/Navbar';
import MatchcardCarousel from '../components/Carousel';
import classes from '../styles/Tournament/Tournament.module.css';
import { useSidebarCollapseStore } from '../stores/sidebar-collapse-store';
import { useState } from 'react';
import { GET_TOURNAMENTS } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { TournamentType } from '../types/Tournament';
import { Button, Loader, useMantineTheme } from '@mantine/core';

export default function Tournament() {
  const { tournamentName } = useParams<{ tournamentName: string }>();
  const navigate = useNavigate();
  const { isCollapsed } = useSidebarCollapseStore();
  const [page, setPage] = useState(1);
  const [tournaments, setTournaments] = useState<TournamentType[]>([]);
  const theme = useMantineTheme();

  const { loading, error, fetchMore } = useQuery(GET_TOURNAMENTS, {
    variables: { tournamentName: tournamentName, page: page },
    onCompleted: (data) => setTournaments(data.tournaments),
    onError: (error) => console.log('Error:', error),
  });

  const handleClick = async () => {
    const { data } = await fetchMore({
      variables: { tournamentName: tournamentName, page: page + 1 },
    });

    if (data) {
      setPage((prevPage) => prevPage + 1);
      setTournaments((prevTournaments) => [...prevTournaments, ...data.tournaments]);
      console.log([...tournaments, ...data.tournaments]);
    }
  };

  const carousels = tournaments.map((tournament: TournamentType) => {
    return (
      <div key={tournament._id}>
        <MatchcardCarousel cardType={'match'} data={tournament.results} title={tournament._id} loading={loading} error={error}/>
      </div>
    );
  });

  if (error) {
    console.error(error);
    navigate('/not-found');
  }

  return (
    <div className="layoutContainer">
      <SideBar />
      <div id="rightContainer" className={isCollapsed ? 'rightContainerCollapsed' : 'rightContainerExpanded'}>
        <div className="rightInnerContainer">
          <Navbar />
          <h1>{tournamentName}</h1>
          {loading && <Loader size={25} color={theme.colors.primary[5]}/>}
          <div className={classes.carouselSection}>{carousels}</div>
          <Button onClick={handleClick}>
            Load More
          </Button>
        </div>
      </div>
    </div>
  );
}