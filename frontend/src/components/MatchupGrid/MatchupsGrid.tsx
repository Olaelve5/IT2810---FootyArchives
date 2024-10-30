import { Text } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import SortButton from './SortButton';
import classes from '../../styles/MatchupsGrid.module.css';
import { ResultType } from '../../types/ResultType';
import { MatchCard } from '../Cards/MatchCard';

interface MatchupsGridProps {
  totalResults: number;
  results?: ResultType[];
}

export default function MatchupsGrid({ totalResults, results }: MatchupsGridProps) {
  const theme = useMantineTheme();

  return (
    <div className={classes.container}>
      <div className={classes.topContainer}>
        <Text c={theme.colors.darkmode[8]}>{totalResults} matchups found</Text>
        <SortButton />
      </div>
      {totalResults === 0 && <Text>No matchups found</Text>}
      <div className={classes.grid}>{results?.map((result) => <MatchCard key={result._id} {...result} />)}</div>
    </div>
  );
}
