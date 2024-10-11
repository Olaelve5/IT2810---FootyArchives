import { Text } from '@mantine/core';
import { useState } from 'react';
import { useMantineTheme } from '@mantine/core';
import SortButton from './SortButton';
import classes from '../../styles/MatchupsGrid.module.css';

export default function MatchupsGrid() {
  const theme = useMantineTheme();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [numberOfResults, setNumberOfResults] = useState(0);

  return (
    <div className={classes.container}>
      <div className={classes.topContainer}>
        <Text c={theme.colors.darkmode[8]}>{numberOfResults} matchups found</Text>
        <SortButton />
      </div>
      {numberOfResults === 0 && <Text>No matchups found</Text>}
    </div>
  );
}
