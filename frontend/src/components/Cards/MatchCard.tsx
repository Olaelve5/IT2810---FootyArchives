import { Card, Text, Group } from '@mantine/core';
import { ResultType } from '../../types/ResultType';
import classes from '../../styles/Cards/Cards.module.css';
import { useMantineTheme, useMantineColorScheme } from '@mantine/core';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/dateUtils';
import { getCountryCode } from '../../utils/imageUtils';
import { useEffect, useState } from 'react';

export function MatchCard(props: ResultType) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const date = formatDate(props.date);
  const [countryCodes, setCountryCodes] = useState<string[]>([]);

  useEffect(() => {
    const codes = getCountryCode([props.home_team, props.away_team]);
    setCountryCodes(codes as string[]);
  }, [props.home_team, props.away_team]);

  return (
    <Link to={`/project2/matchup/${props._id}`}>
      <Card
        padding="xs"
        radius="md"
        shadow="xl"
        className={classes.card}
        id={isDark ? classes.darkCard : classes.lightCard}
        style={{
          backgroundColor: isDark ? theme.colors.darkmode[1] : 'white',
        }}
      >
        <Group align="center" justify="center" display="flex" className={classes.detailsContainer}>
          <Text size="lg" fw={600} style={{ whiteSpace: 'noWrap' }}>
            {props.home_team} vs {props.away_team}
          </Text>
          <div className={classes.dateTournamentContainer}>
            <Text className={isDark ? classes.darkText : classes.lightText} size="sm">
              {props.tournament}
            </Text>
            <Text className={isDark ? classes.darkText : classes.lightText} size="sm">
              {date}
            </Text>
          </div>
        </Group>

        <Group>
          <div className="flagImageContainer">
            <span className={`fi fi-${countryCodes[0]}`} id="flagImage"></span>
          </div>
          <Group gap="xs">
            <Text fw={600} size="lg">
              {props.home_score}
            </Text>
            <Text fw={600} size="lg">
              -
            </Text>
            <Text fw={600} size="lg">
              {props.away_score}
            </Text>
          </Group>
          <div className="flagImageContainer">
            <span className={`fi fi-${countryCodes[1]}`} id="flagImage"></span>
          </div>
        </Group>
      </Card>
    </Link>
  );
}
