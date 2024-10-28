import { IconTrophy, IconCalendarEvent, IconMapPin } from '@tabler/icons-react';
import classes from '../../styles/Matchup/MatchDetails.module.css';
import { useMantineColorScheme, useMantineTheme, Text } from '@mantine/core';
import { ResultType } from '../../types/ResultType';
import { useEffect, useState } from 'react';
import { formatDate } from '../../utils/dateUtils';

export default function MatchDetails(data: ResultType) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const [result, setResult] = useState<ResultType | null>(null);

  const getColor = () => {
    return isDark ? theme.colors.darkmode[8] : 'black';
  };

  useEffect(() => {
    setResult(data);
  }, [data]);

  if (!result) {
    return null;
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>
        {result.home_team} vs {result.away_team}
      </h1>
      <div className={classes.bottomContainer}>
        <div className={classes.detailContainer}>
          <IconTrophy size={22} stroke={1.5} color={getColor()} />
          <Text c={getColor()}>{data.tournament}</Text>
        </div>
        <div className={classes.detailContainer}>
          <IconCalendarEvent size={22} stroke={1.5} color={getColor()} />
          <Text c={getColor()}>{formatDate(data.date)}</Text>
        </div>
        <div className={classes.detailContainer}>
          <IconMapPin size={22} stroke={1.5} color={getColor()} />
          <Text c={getColor()}>
            {data.city}, {data.country}
          </Text>
        </div>
      </div>
    </div>
  );
}
