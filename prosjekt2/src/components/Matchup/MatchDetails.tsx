import { matchup } from '../../utils/tempUtils';
import { IconTrophy, IconCalendarEvent, IconMapPin } from '@tabler/icons-react';
import classes from '../../styles/Matchup/MatchDetails.module.css';
import { useMantineColorScheme, useMantineTheme, Text } from '@mantine/core';

export default function MatchDetails() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const getColor = () => {
    return isDark ? theme.colors.darkmode[6] : 'black';
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>
        {matchup.home_team} vs {matchup.away_team}
      </h1>
      <div className={classes.bottomContainer}>
        <div className={classes.detailContainer}>
          <IconTrophy size={22} stroke={1.5} color={getColor()} />
          <Text c={getColor()}>{matchup.tournament}</Text>
        </div>
        <div className={classes.detailContainer}>
          <IconCalendarEvent size={22} stroke={1.5} color={getColor()} />
          <Text c={getColor()}>{matchup.date}</Text>
        </div>
        <div className={classes.detailContainer}>
          <IconMapPin size={22} stroke={1.5} color={getColor()} />
          <Text c={getColor()}>
            {matchup.city}, {matchup.country}
          </Text>
        </div>
      </div>
    </div>
  );
}
