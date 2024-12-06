import { Text } from '@mantine/core';
import { useMantineTheme, Loader } from '@mantine/core';
import SortButton from './SortButton';
import classes from '../../styles/MatchupsSearch/MatchupsGrid.module.css';
import { ResultType } from '../../types/ResultType';
import { MatchCard } from '../Cards/MatchCard';
import { useLanguageStore } from '../../stores/language-store';

interface MatchupsGridProps {
  totalResults: number;
  results?: ResultType[];
  loading?: boolean;
}

export default function MatchupsGrid({ totalResults, results, loading }: MatchupsGridProps) {
  const theme = useMantineTheme();
  const { language } = useLanguageStore();

  return (
    <div className={classes.container}>
      <div className={classes.topContainer}>
        <Text c={theme.colors.darkmode[8]} className={classes.matchFoundText}>
          {totalResults} {language === 'en' ? 'matchups found' : 'kamper funnet'}
        </Text>
        {loading && <Loader size={25} color={theme.colors.primary[5]} />}
        <SortButton />
      </div>
      {totalResults === 0 && <Text>{language === 'en' ? 'No matchups found' : 'Ingen kamper funnet'}</Text>}
      <div className={classes.grid}>
        {results?.map((result) => (
          <div className={classes.gridsCell} key={result._id}>
            <MatchCard key={result._id} {...result} />
          </div>
        ))}
      </div>
    </div>
  );
}
