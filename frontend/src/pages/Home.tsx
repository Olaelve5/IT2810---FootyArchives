import '../styles/App.css';
import '@mantine/core/styles.css';
import Navbar from '../components/Navbar/Navbar';
import SideBar from '../components/SideBar/SideBar';
import MatchCardCarousel from '../components/Carousel/Carousel';
import Logo from '../components/Home/BigLogo';
import DiscoverButton from '../components/Home/DiscoverButton';
import { useSidebarCollapseStore } from '../stores/sidebar-collapse-store';
import { GET_RESULTS } from '../graphql/resultOperations';
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
          <div>
            <MatchCardCarousel
              titleEn={'Top teams'}
              titleNo={'Beste lag'}
              cardType={'team'}
              data={nationStatsProps}
              loading={nationStatsLoading}
              error={nationStatsError}
            />
          </div>
          <div>
            <MatchCardCarousel
              titleEn={'Recent matchups'}
              titleNo={'Siste kamper'}
              cardType={'match'}
              data={recentMatchupsProps}
              loading={recentMatchupsLoading}
              error={recentMatchupsError}
            />
          </div>
          <div style={{ border: 'none' }}>
            <MatchCardCarousel
              titleEn={'Biggest wins'}
              titleNo={'Største seire'}
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
