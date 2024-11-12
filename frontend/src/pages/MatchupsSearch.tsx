import Navbar from '../components/Navbar/Navbar';
import SideBar from '../components/SideBar/SideBar';
import MatchupsGrid from '../components/MatchupsSearch/MatchupsGrid';
import { useSidebarCollapseStore } from '../stores/sidebar-collapse-store';
import { useEffect, useState } from 'react';
import { GET_RESULTS } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import PaginationComponent from '../components/MatchupsSearch/Pagination';
import { useNavigate } from 'react-router-dom';
import { QuerySortType } from '../types/QuerySortType';
import { QueryFilterType } from '../types/QueryFilterType';
import classes from '../styles/MatchupsSearch/MatchupsSearch.module.css';
import Filters from '../components/MatchupsSearch/Filters/Filters';
import { useFilterStore } from '../stores/filter-store';
import { useLanguageStore } from '../stores/language-store';

export default function Matchups() {
  const { isCollapsed } = useSidebarCollapseStore();
  const { language } = useLanguageStore();
  const [page, setPage] = useState(1);
  const { selectedTeams, yearRange, selectedTournaments, exclusive } = useFilterStore();
  const [sort, setSort] = useState<QuerySortType>({ field: 'date', order: -1 });
  const [filters, setFilters] = useState<QueryFilterType>({
    teams: selectedTeams,
    tournaments: selectedTournaments,
    yearRange: yearRange,
    exclusive: exclusive,
  });
  const navigate = useNavigate();

  // Limit of results per page - ideally divisible by 2, 3 and 4
  const limit = 24;

  // State for the results data -> necesarry to prevent unwanted scrolling behavior
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  // Fetch the matchups data
  const { loading, error } = useQuery(GET_RESULTS, {
    variables: { limit: limit, page: page, sort: sort, filters: filters },
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

  useEffect(() => {
    console.log(error);
  }, [error, navigate]);

  return (
    <div className="layoutContainer">
      <SideBar />
      <div id="rightContainer" className={isCollapsed ? 'rightContainerCollapsed' : 'rightContainerExpanded'}>
        <div className="rightInnerContainer">
          <Navbar />
          <div className={classes.topContainer}>
            <div className={classes.titleDescriptionContainer}>
              <h2>{language === 'en' ? 'Matchups' : 'Kamper'}</h2>
            </div>
            <Filters setFilters={setFilters} setPage={setPage} />
          </div>
          <div>
            <MatchupsGrid
              totalResults={totalResults}
              results={results}
              sort={sort}
              setSort={setSort}
              loading={loading}
            />
            <PaginationComponent totalPages={totalPages} page={page} setPage={setPage} />
          </div>
        </div>
      </div>
    </div>
  );
}
