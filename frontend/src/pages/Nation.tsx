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
import { GET_RESULTS } from '../graphql/resultOperations';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { recentResultsSort, biggestWinsSort } from '../utils/sortOptions';
import Rival from '../components/Nation/Rival';
import { useLanguageStore } from '../stores/language-store';
import { getCountryCode } from '../utils/imageUtils';

function Nation() {
  const { language } = useLanguageStore();
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
    return ((wins / (wins + losses)) * 100).toFixed(2);
  };

  if (error || recentError || biggestWinsError || worstDefeatsError) navigate('/project2/not-found');

  return (
    <div className="layoutContainer">
      <SideBar />
      <div id="rightContainer" className={isCollapsed ? 'rightContainerCollapsed' : 'rightContainerExpanded'}>
        <div className="rightInnerContainer">
          <Navbar />

          {loading || recentLoading || biggestWinsLoading || worstDefeatsLoading ? (
            <Loader size={25} color={theme.colors.primary[9]} />
          ) : (
            <div>
              <div className={classes.topContainer}>
                <div>
                  <div className={classes.flagTitleContainer}>
                    <div className="flagImageContainer" id={classes.flagImageContainer}>
                      <span className={`fi fi-${getCountryCode([nation._id])}`} id="flagImage"></span>
                    </div>
                    <h1 className={classes.nationName}>{language === 'no' ? nation.name_no : nation._id}</h1>
                  </div>
                  <div className={classes.nationStatsContainer}>
                    <p>
                      {nation.total_team_games} {language == 'no' ? 'kamper spilt' : 'games played'}
                    </p>
                    <div className={classes.innerNationStatsConatiner}>
                      <p>
                        {nation.total_team_wins} {language == 'no' ? 'seire' : 'wins'}
                      </p>
                      <p>
                        {nation.total_team_draws} {language == 'no' ? 'uavgjort' : 'draws'}
                      </p>
                      <p>
                        {nation.total_team_losses} {language == 'no' ? 'tap' : 'losses'}
                      </p>
                    </div>
                    <p>
                      {language == 'no' ? 'S/T forhold' : 'W/L ratio'}:{' '}
                      {calculateWinLossRatio(nation.total_team_wins, nation.total_team_losses)}%
                    </p>
                  </div>
                </div>
                <Rival rivalEn={nation.top_rival.opponent} rivalNO={nation.top_rival.name_no} />
              </div>
              <div className={classes.carouselSection}>
                <MatchCardCarousel titleEn="Recent matchups" titleNo='Siste kamper' cardType="match" data={recentData.results.results} />
              </div>
              <div className={classes.carouselSection}>
                <MatchCardCarousel titleEn="Biggest wins" titleNo='Største seire' cardType="match" data={biggestWinsData.results.results} />
              </div>
              <div className={classes.carouselSection} style={{ border: 'none' }}>
                <MatchCardCarousel titleEn="Worst defeats" titleNo='Verste tap' cardType="match" data={worstDefeatsData.results.results} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nation;
