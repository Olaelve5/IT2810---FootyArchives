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
import { QuerySortType } from '../types/QuerySortType';

export default function Matchups() {
  const language = useLanguageStore((state) => state.language);
  const { isCollapsed } = useSidebarCollapseStore();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<QuerySortType>({ field: 'date', order: -1 });
  const navigate = useNavigate();

  // State for the results data -> necesarry to prevent unwanted scrolling behavior
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  // Fetch the matchups data
  const { loading, error } = useQuery(GET_RESULTS, {
    variables: { limit: 20, page: page, sort: sort },
    onCompleted: (data) => {
      setResults(data.results.results);
      setTotalPages(data.results.totalPages);
      setTotalResults(data.results.total);
    },
  });

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
          <h2>Matchups</h2>
          <p>{language === 'en' ? 'Search and filter through all matchups' : 'Søk og filtrer gjennom alle kamper'}</p>
          <Filters />
          <div>
            <MatchupsGrid totalResults={totalResults} results={results} sort={sort} setSort={setSort} loading={loading}/>
            <PaginationComponent totalPages={totalPages} page={page} setPage={setPage} />
          </div>
        </div>
      </div>
    </div>
  );
}
