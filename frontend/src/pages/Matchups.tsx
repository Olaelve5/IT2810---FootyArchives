import Navbar from '../components/Navbar/Navbar';
import SideBar from '../components/SideBar/SideBar';
import Filters from '../components/Filters/Filters';
import { useLanguageStore } from '../stores/language-store';
import MatchupsGrid from '../components/MatchupGrid/MatchupsGrid';
import { useSidebarCollapseStore } from '../stores/sidebar-collapse-store';
import { useEffect, useState } from 'react';
import { GET_RESULTS } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import PaginationComponent from '../components/MatchupGrid/Pagination';
import { useNavigate } from 'react-router-dom';

export default function Matchups() {
  const language = useLanguageStore((state) => state.language);
  const { isCollapsed } = useSidebarCollapseStore();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ field: 'date', order: -1 });
  const navigate = useNavigate();

  // Fetch the matchups data
  const { loading, error, data } = useQuery(GET_RESULTS, {
    variables: { limit: 20, page: page, sort: sort },
  });

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  if (error) navigate('/proket2/not-found');

  return (
    <div className="layoutContainer">
      <SideBar />
      <div id="rightContainer" className={isCollapsed ? 'rightContainerCollapsed' : 'rightContainerExpanded'}>
        <div className="rightInnerContainer">
          <Navbar />
          <h2>Matchups</h2>
          <p>{language === 'en' ? 'Search and filter through all matchups' : 'Søk og filtrer gjennom alle kamper'}</p>
          <Filters />
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <MatchupsGrid totalResults={data.results.total} results={data.results.results}/>
              <PaginationComponent totalPages={data.totalPages} page={page} setPage={setPage} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
