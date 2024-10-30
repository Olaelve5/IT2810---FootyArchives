import '../styles/App.css';
import '@mantine/core/styles.css';
import { Loader, useMantineTheme } from '@mantine/core';
import Navbar from '../components/Navbar/Navbar';
import SideBar from '../components/SideBar/SideBar';
import MatchCardCarousel from '../components/Carousel/Carousel';
import classes from '../styles/Nation/Nation.module.css';
import { useSidebarCollapseStore } from '../stores/sidebar-collapse-store';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GET_NATION_STAT } from '../graphql/nationStatsOperations';
import { GET_RESULTS } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { getCountryCode } from '../utils/imageUtils';
import { recentResultsSort, biggestWinsSort } from '../utils/sortOptions';
import Rival from '../components/Nation/Rival';

function Nation() {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { isCollapsed } = useSidebarCollapseStore();
  const { nationName } = useParams<{ nationName: string }>();

  // Fetch the nation data
  const { loading, error, data } = useQuery(GET_NATION_STAT, {
    variables: { _id: nationName },
  });

  const nation = data?.nationStat;

  //Fetch the recent results data
  const {
    loading: recentLoading,
    error: recentError,
    data: recentData,
  } = useQuery(GET_RESULTS, {
    variables: { limit: 12, sort: recentResultsSort, filters: { teams: [nationName] } },
  });

  // Fetch the biggest wins data
  const {
    loading: biggestWinsLoading,
    error: biggestWinsError,
    data: biggestWinsData,
  } = useQuery(GET_RESULTS, {
    variables: { limit: 12, sort: biggestWinsSort, filters: { winningTeam: nationName } },
  });

  // Fetch the worst defeats data
  const {
    loading: worstDefeatsLoading,
    error: worstDefeatsError,
    data: worstDefeatsData,
  } = useQuery(GET_RESULTS, {
    variables: { limit: 12, sort: biggestWinsSort, filters: { losingTeam: nationName } },
  });

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const calculateWinLossRatio = (wins: number, losses: number) => {
    return (wins / (wins + losses)).toFixed(2);
  };

  if (error || recentError || biggestWinsError || worstDefeatsError) navigate('/project2/not-found');

  return (
    <div className="layoutContainer">
      <SideBar />
      <div id="rightContainer" className={isCollapsed ? 'rightContainerCollapsed' : 'rightContainerExpanded'}>
        <div className="rightInnerContainer">
          <Navbar />

          {loading || recentLoading || biggestWinsLoading || worstDefeatsLoading ? (
            <Loader size={25} color={theme.colors.primary[5]} />
          ) : (
            <div>
              <div className={classes.topContainer}>
                <div>
                  <div className={classes.flagTitleContainer}>
                    <div className="flagImageContainer" id={classes.flagImageContainer}>
                      <span className={`fi fi-${getCountryCode([nation._id])}`} id="flagImage"></span>
                    </div>
                    <h1 className={classes.nationName}>{nation._id}</h1>
                  </div>
                  <div className={classes.nationStatsContainer}>
                    <p>{nation.total_team_games} games played</p>
                    <div className={classes.innerNationStatsConatiner}>
                      <p>{nation.total_team_wins} wins</p>
                      <p>{nation.total_team_draws} draws</p>
                      <p>{nation.total_team_losses} losses</p>
                    </div>
                    <p>W/L ratio: {calculateWinLossRatio(nation.total_team_wins, nation.total_team_losses)}%</p>
                  </div>
                </div>
                <Rival rivalNation={nation.top_rival.opponent} />
              </div>
              <div className={classes.carouselSection}>
                <MatchCardCarousel title="Recent matchups" cardType="match" data={recentData.results.results} />
              </div>
              <div className={classes.carouselSection}>
                <MatchCardCarousel title="Biggest wins" cardType="match" data={biggestWinsData.results.results} />
              </div>
              <div className={classes.carouselSection} style={{ border: 'none' }}>
                <MatchCardCarousel title="Worst defeats" cardType="match" data={worstDefeatsData.results.results} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nation;
