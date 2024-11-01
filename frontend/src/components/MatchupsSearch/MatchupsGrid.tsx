import { Text } from '@mantine/core';
import { useMantineTheme, Loader } from '@mantine/core';
import SortButton from './SortButton';
import classes from '../../styles/MatchupsSearch/MatchupsGrid.module.css';
import { ResultType } from '../../types/ResultType';
import { MatchCard } from '../Cards/MatchCard';
import { QuerySortType } from '../../types/QuerySortType';

interface MatchupsGridProps {
  totalResults: number;
  results?: ResultType[];
  sort: QuerySortType;
  setSort: (sort: QuerySortType) => void;
  loading?: boolean;
}

export default function MatchupsGrid({ totalResults, results, sort, setSort, loading  }: MatchupsGridProps) {
  const theme = useMantineTheme();

  return (
    <div className={classes.container}>
      <div className={classes.topContainer}>
        <Text c={theme.colors.darkmode[8]}>{totalResults} matchups found</Text>
        {loading && <Loader size={25} color={theme.colors.primary[5]} />}
        <SortButton sort={sort} setSort={setSort}/>
      </div>
      {totalResults === 0 && <Text>No matchups found</Text>}
      <div className={classes.grid}>{results?.map((result) => <MatchCard key={result._id} {...result} />)}</div>
    </div>
  );
}
