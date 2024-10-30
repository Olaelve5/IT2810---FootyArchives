import '../styles/App.css';
import '@mantine/core/styles.css';
import Navbar from '../components/Navbar/Navbar';
import SideBar from '../components/SideBar/SideBar';
import MatchCardCarousel from '../components/Carousel';
import Logo from '../components/BigLogo';
import classes from '../styles/Home/Home.module.css';
import DiscoverButton from '../components/DiscoverButton';
import { useSidebarCollapseStore } from '../stores/sidebar-collapse-store';
import { GET_RESULTS } from '../graphql/queries';
import { GET_NATION_STATS } from '../graphql/nationStatsOperations';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { NationType } from '../types/NationType';
import { ResultType } from '../types/ResultType';
import { nationStatsSort, recentResultsSort, biggestWinsSort } from '../utils/sortOptions';

function Home() {
  const { isCollapsed } = useSidebarCollapseStore();
  const limit = 12;
  const [nationStatsProps, setNationStatsProps] = useState<NationType[]>([]);
  const [recentMatchupsProps, setRecentMatchupsProps] = useState<ResultType[]>([]);
  const [biggestWinsProps, setBiggestWinsProps] = useState<ResultType[]>([]);

  const { error: nationStatsError, loading: nationStatsLoading } = useQuery(GET_NATION_STATS, {
    variables: { limit, sort: nationStatsSort },
    onCompleted: (data) => setNationStatsProps(data.nationStats),
  });

  const { error: recentMatchupsError, loading: recentMatchupsLoading } = useQuery(GET_RESULTS, {
    variables: { limit, sort: recentResultsSort },
    onCompleted: (data) => setRecentMatchupsProps(data.results.results),
  });

  const { error: biggestWinsError, loading: biggestWinsLoading } = useQuery(GET_RESULTS, {
    variables: { limit, sort: biggestWinsSort },
    onCompleted: (data) => setBiggestWinsProps(data.results.results),
  });

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="layoutContainer">
      <SideBar />
      <div id="rightContainer" className={isCollapsed ? 'rightContainerCollapsed' : 'rightContainerExpanded'}>
        <div className="rightInnerContainer">
          <Navbar />
          <Logo />
          <DiscoverButton />
          <div className={classes.carouselSection}>
            <MatchCardCarousel
              title={'Top teams'}
              cardType={'team'}
              data={nationStatsProps}
              loading={nationStatsLoading}
              error={nationStatsError}
            />
          </div>
          <div className={classes.carouselSection}>
            <MatchCardCarousel
              title={'Recent matchups'}
              cardType={'match'}
              data={recentMatchupsProps}
              loading={recentMatchupsLoading}
              error={recentMatchupsError}
            />
          </div>
          <div className={classes.carouselSection} style={{ border: 'none' }}>
            <MatchCardCarousel
              title={'Biggest wins'}
              cardType={'match'}
              data={biggestWinsProps}
              loading={biggestWinsLoading}
              error={biggestWinsError}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
