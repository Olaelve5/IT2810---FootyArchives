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

export default function Tournament() {
  const { tournamentName } = useParams<{ tournamentName: string }>();
  const navigate = useNavigate();
  const { isCollapsed } = useSidebarCollapseStore();
  const [page, setPage] = useState(1);

  const { data, loading, error } = useQuery(GET_TOURNAMENTS, {
    variables: { tournamentName: tournamentName, page: page }, // Adjust as needed
    onCompleted: (data) => console.log("Data:", data.tournaments),
    onError: (error) => console.log("Error:", error),
  });

  if (loading) {
    return <div>Loading {tournamentName}</div>;
  }

  if (error) {
    console.error(error);
    navigate('/not-found');
  }

  const carousels = data.tournaments.map((tournament: TournamentType) => {
    return (
      <div key={tournament._id}>
        <h2>{tournament.tournament}</h2>
        <MatchcardCarousel />
      </div>
    );
  });

  return (
    <div className="layoutContainer">
      <SideBar />
      <div id="rightContainer" className={isCollapsed ? 'rightContainerCollapsed' : 'rightContainerExpanded'}>
        <div className="rightInnerContainer">
          <Navbar />
          <h1>{tournamentName}</h1>
          <p>Info om {tournamentName}</p>{' '}
        </div>
      </div>
    </div>
  );
}
