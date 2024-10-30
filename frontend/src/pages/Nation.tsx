import '../styles/App.css';
import '@mantine/core/styles.css';
import { Loader, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import Navbar from '../components/Navbar/Navbar';
import SideBar from '../components/SideBar/SideBar';
import MatchCardCarousel from '../components/Carousel';
import classes from '../styles/Home/Home.module.css';
import { useSidebarCollapseStore } from '../stores/sidebar-collapse-store';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GET_NATION_STAT } from '../graphql/nationStatsOperations';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { getCountryCode } from '../utils/imageUtils';

function Country() {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { isCollapsed } = useSidebarCollapseStore();
  const { nationName } = useParams<{ nationName: string }>();

  const { loading, error, data } = useQuery(GET_NATION_STAT, {
    variables: { _id: nationName },
  });

  const nation = data?.nationStat;

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  if (error) navigate('/project2/not-found');

  return (
    <div className="layoutContainer">
      <SideBar />
      <div id="rightContainer" className={isCollapsed ? 'rightContainerCollapsed' : 'rightContainerExpanded'}>
        <div className="rightInnerContainer">
          <Navbar />

          {loading ? (
            <Loader size={25} color={theme.colors.primary[5]} />
          ) : (
            <div>
              <div>
                <div>
                  <div className="flagImageContainer">
                    <span className={`fi fi-${getCountryCode([nation._id])}`} id="flagImage"></span>
                  </div>
                  <h1 className={classes.nationName}>{nation._id}</h1>
                </div>
              </div>
              <div className={classes.carouselSection}>
                <MatchCardCarousel title="Recent matchups" />
              </div>
              <div className={classes.carouselSection}>
                <MatchCardCarousel title="Biggest wins" />
              </div>
              <div className={classes.carouselSection}>
                <MatchCardCarousel title="Worst defeats" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Country;
